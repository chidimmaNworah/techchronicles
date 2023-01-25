import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import logger from 'use-reducer-logger';
import { API_URL } from '../utils';
import { Link } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Product from './Product';

axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function TrendingProducts() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`${API_URL}/api/nailarts`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Link to="/nailarts">
        <div className="text-center">
          <h2 className="homescreen-heading"> Trending Products</h2>
        </div>
      </Link>

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products?.length === 0 && (
              <MessageBox>No Product Found</MessageBox>
            )}
            <Swiper
              breakpoints={{
                // when window width is >= 640px
                340: {
                  width: 340,
                  slidesPerView: 3,
                },
                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 4,
                },
                968: {
                  width: 968,
                  slidesPerView: 5,
                },
              }}
              spaceBetween={10}
              className="mySwiper"
            >
              {products?.slice(0, 12).map((product) => (
                <SwiperSlide className="featured-cards" key={product._id}>
                  <Product product={product}></Product>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </>
  );
}
