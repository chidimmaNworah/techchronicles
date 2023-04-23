import React, { useEffect, useReducer } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import { CarouselSlide, CategorySlide } from '../components';
import { WidgetScreen, LatestNews } from '../components';
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
  const [{ blogs }, dispatch] = useReducer(logger(reducer), {
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
        <title>Kimmotechnology - Blog</title>
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
                      to="/allnews"
                      className="text-secondary font-weight-medium text-decoration-none"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <LatestNews />

                {/* Advertisment start */}

                <div className="col-lg-12 mb-3">
                  <a
                    href="https://www.kimmotechnology.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="img-fluid w-100"
                      src="https://res.cloudinary.com/kimmoramicky/image/upload/v1681288627/Adverts/cv_banner_advert_gtyc5b.png"
                      alt="cv_advert_banner"
                    />
                  </a>
                </div>

                {/* Advertisment end */}

                <div className="col-lg-12 d-flex">
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
                          width={135}
                        />
                        <div className="text-truncate w-100 h-100 px-1 d-flex flex-column justify-content-center border border-left-0">
                          <div>
                            <Link
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                              to={{
                                pathname: '/search',
                                search: `category=${blog.category}`,
                              }}
                            >
                              {blog.category}
                            </Link>
                            <small>
                              {moment(blog.createdAt).format('MMMM Do YYYY')}
                            </small>
                          </div>
                          <div className="text-truncate w-100">
                            <Link
                              className="m-0 text-secondary text-uppercase font-weight-bold"
                              to={`/article/${blog.slug}`}
                            >
                              {blog.name}
                            </Link>
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
                          width={135}
                        />
                        <div className="text-truncate w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                          <div className="mb-2">
                            <a
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                              href="/"
                            >
                              {blog.category}
                            </a>
                            <small>
                              {moment(blog.createdAt).format('MMMM Do YYYY')}
                            </small>
                          </div>
                          <div className="text-truncate">
                            <Link
                              className="m-0 text-secondary text-uppercase font-weight-bold"
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
                                {moment(blog.createdAt).format('MMMM Do YYYY')}
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
                              src="https://res.cloudinary.com/kimmoramicky/image/upload/v1681199111/kimmora_qiefbe.png"
                              width="25"
                              height="25"
                              alt="author"
                            />
                            <small>Kimmora</small>
                          </div>
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
                                {moment(blog.createdAt).format('MMMM Do YYYY')}
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
                              {moment(blog.createdAt).format('MMMM Do YYYY')}
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
