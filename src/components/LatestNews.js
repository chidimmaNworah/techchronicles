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

export default function LatestNews() {
  const [{ blogs }, dispatch] = useReducer(logger(reducer), {
    blogs: [],
    loading: true,
    error: '',
  });
  // const [blogs, setProducts] = useState([]);
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
    <>
      <div className="col-lg-6">
        {blogs?.slice(8, 10).map((blog) => (
          <div className="position-relative mb-3" key={blog.name}>
            <img
              className="img-fluid w-100"
              src={blog.image}
              alt={blog.name}
              style={{ objectFit: 'cover' }}
            />
            <div className="bg-white border border-top-0 p-4">
              <div className="mb-2">
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
              <div className="truncate-overflow-3">
                <Link
                  className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                  to={`/article/${blog.slug}`}
                >
                  {blog.name}
                </Link>
              </div>
              <div className="truncate-overflow">
                <p className="m-0">{blog.smallPost}</p>
              </div>
            </div>

            <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
              {!blog.user ? (
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle mr-2"
                    src="https://res.cloudinary.com/kimmoramicky/image/upload/v1681199111/kimmora_qiefbe.png"
                    width="25"
                    height="25"
                    alt="author"
                  />
                  <span>Kimmora</span>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle mr-2"
                    src={blog.user.images[0]}
                    width="25"
                    height="25"
                    alt="author"
                  />
                  <span>{blog.user.name}</span>
                </div>
              )}
              <div className="d-flex align-items-center">
                <small className="ml-3">
                  <i className="far fa-eye mr-2"></i>
                  {blog.views}
                </small>
                <small className="ml-3">
                  <i className="far fa-comment mr-2"></i>
                  {blog.numReviews}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-lg-6">
        {blogs?.slice(11, 13).map((blog) => (
          <div className="position-relative mb-3" key={blog.name}>
            <img
              className="img-fluid w-100"
              src={blog.image}
              alt={blog.name}
              style={{ objectFit: 'cover' }}
            />
            <div className="bg-white border border-top-0 p-4">
              <div className="mb-2">
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
              <div className="truncate-overflow-3">
                <Link
                  className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                  to={`/article/${blog.slug}`}
                >
                  {blog.name}
                </Link>
              </div>
              <div className="truncate-overflow">
                <p className="m-0">{blog.smallPost}</p>
              </div>
            </div>

            <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
              {!blog.user ? (
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle mr-2"
                    src="https://res.cloudinary.com/kimmoramicky/image/upload/v1681199111/kimmora_qiefbe.png"
                    width="25"
                    height="25"
                    alt="author"
                  />
                  <span>Kimmora</span>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle mr-2"
                    src={blog.user.images[0]}
                    width="25"
                    height="25"
                    alt="author"
                  />
                  <span>{blog.user.name}</span>
                </div>
              )}
              <div className="d-flex align-items-center">
                <small className="ml-3">
                  <i className="far fa-eye mr-2"></i>
                  {blog.views}
                </small>
                <small className="ml-3">
                  <i className="far fa-comment mr-2"></i>
                  {blog.numReviews}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
