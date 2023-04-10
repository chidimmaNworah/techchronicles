import React, { useEffect, useReducer } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import { CarouselSlide, CategorySlide } from '../components';
import WidgetScreen from '../components/WidgetScreen';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import axios from 'axios';
import { API_URL } from '../utils';
import moment from 'moment';

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

function HomeScreen() {
  const [{ loading, error, blogs }, dispatch] = useReducer(logger(reducer), {
    products: [],
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
    <>
      <Helmet>
        <title>Home | Techchronicles News for techies</title>
      </Helmet>

      <div className="header-container">
        <CarouselSlide />
      </div>

      <Container>
        <div>
          <CategorySlide />
        </div>
      </Container>

      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h4 className="m-0 text-uppercase font-weight-bold">
                      Latest News
                    </h4>
                    <Link
                      to={{ pathname: '/search', search: `category='latest'` }}
                      className="text-secondary font-weight-medium text-decoration-none"
                    >
                      View All
                    </Link>
                  </div>
                </div>

                {/* Latest News Section */}

                <div className="col-lg-6">
                  {blogs?.slice(8, 13).map((blog) => (
                    <div className="position-relative mb-3">
                      <img
                        className="img-fluid w-100"
                        src={blog.image}
                        alt={blog.name}
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="bg-white border border-top-0 p-4">
                        <div className="mb-2">
                          <a
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                            href="/"
                          >
                            {blog.category}
                          </a>
                          <a className="text-body" href="/">
                            <small>Jan 01, 2045</small>
                          </a>
                        </div>
                        <div className="truncate">
                          <Link
                            className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                            to="/"
                          >
                            {blog.name}
                          </Link>
                        </div>
                        <div className="truncate">
                          <p className="m-0">{blog.smallPost}</p>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                        <div className="d-flex align-items-center">
                          <img
                            className="rounded-circle mr-2"
                            src="img/user.jpg"
                            width="25"
                            height="25"
                            alt=""
                          />
                          <small>KimmoTech</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <small className="ml-3">
                            <i className="far fa-eye mr-2"></i>12345
                          </small>
                          <small className="ml-3">
                            <i className="far fa-comment mr-2"></i>123
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* End of Latest News Section */}

                <div className="col-lg-6">
                  {blogs?.slice(13, 14).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                    >
                      <img
                        className="img-fluid"
                        src={blog.image}
                        alt={blog.name}
                      />
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                            href="/"
                          >
                            {blog.category}
                          </a>
                          <a className="text-body" href="/">
                            <small>
                              {moment(blog.createdAt).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </small>
                          </a>
                        </div>
                        <div className="truncate">
                          <a
                            className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                            href="/"
                          >
                            {blog.name}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-6">
                  {blogs?.slice(15, 16).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                    >
                      <img
                        className="img-fluid"
                        src={blog.image}
                        alt={blog.name}
                      />
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                            href="/"
                          >
                            {blog.category}
                          </a>
                          <a className="text-body" href="/">
                            <small>
                              {moment(blog.createdAt).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </small>
                          </a>
                        </div>
                        <div className="truncate">
                          <a
                            className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                            href="/"
                          >
                            {blog.name}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-12">
                  {blogs?.slice(17).map((blog) => (
                    <div className="row news-lg mx-0 mb-3">
                      <div className="col-md-6 h-100 px-0">
                        <img
                          className="img-fluid h-100"
                          src={blog.image}
                          alt={blog.name}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-6 d-flex flex-column border bg-white h-100 px-0">
                        <div className="mt-auto p-4">
                          <div className="mb-2">
                            <a
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                              href="/"
                            >
                              {blog.category}
                            </a>
                            <a className="text-body" href="/">
                              <small>
                                {moment(blog.createdAt).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}
                              </small>
                            </a>
                          </div>
                          <div className="truncate">
                            <a
                              className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                              href="/"
                            >
                              {blog.name}
                            </a>
                          </div>
                          <div className="truncate">
                            <p className="m-0">{blog.smallText}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between bg-white border-top mt-auto p-4">
                          <div className="d-flex align-items-center">
                            <img
                              className="rounded-circle mr-2"
                              src="img/user.jpg"
                              width="25"
                              height="25"
                              alt=""
                            />
                            <small>John Doe</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="ml-3">
                              <i className="far fa-eye mr-2"></i>12345
                            </small>
                            <small className="ml-3">
                              <i className="far fa-comment mr-2"></i>123
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-6">
                  {blogs?.slice(18, 19).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                    >
                      <img
                        className="img-fluid"
                        src={blog.image}
                        alt={blog.name}
                      />
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                            href="/"
                          >
                            {blog.category}
                          </a>
                          <a className="text-body" href="/">
                            <small>
                              <small>
                                {moment(blog.createdAt).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}
                              </small>
                            </small>
                          </a>
                        </div>
                        <div className="truncate">
                          <a
                            className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                            href="/"
                          >
                            {blog.name}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-6">
                  {blogs?.slice(19, 20).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                    >
                      <img src={blog.image} alt={blog.name} />
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                            href="/"
                          >
                            {blog.category}
                          </a>
                          <a className="text-body" href="/">
                            <small>
                              {moment(blog.createdAt).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </small>
                          </a>
                        </div>
                        <div className="truncate">
                          <a
                            className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                            href="/"
                          >
                            {blog.name}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <WidgetScreen />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
