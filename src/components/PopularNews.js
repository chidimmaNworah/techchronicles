import { useEffect, useReducer } from 'react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import logger from 'use-reducer-logger';
import { API_URL } from '../utils';
import { Link } from 'react-router-dom';
import moment from 'moment';

axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function PopularNews() {
  const [{ blogs }, dispatch] = useReducer(logger(reducer), {
    blogs: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`${API_URL}/api/blogs`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="mb-3">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">Popular News</h4>
      </div>
      <div className=" bg-white border border-top-0 p-2">
        {blogs?.slice(2, 6).map((blog) => (
          <div
            className="d-flex align-items-center bg-white mb-1 w-100"
            style={{ height: '110px' }}
            key={blog.name}
          >
            <img
              className="img-fluid"
              src={blog.image}
              alt="article"
              width={100}
            />
            <div className="w-100 h-100 pl-2 d-flex flex-column justify-content-center">
              <div className="mb-1">
                <Link
                  className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                  to={{
                    pathname: '/search',
                    search: `category=${blog.category}`,
                  }}
                >
                  {blog.category}
                </Link>
                <a className="text-body" href="/">
                  <small>{moment(blog.createdAt).format('MMMM Do YYYY')}</small>
                </a>
              </div>
              <div className="w-100 truncate-overflow-3">
                <Link
                  className="m-0 text-secondary font-weight-bold"
                  to={`/article/${blog.slug}`}
                >
                  {blog.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
