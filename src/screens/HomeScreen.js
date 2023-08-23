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

        {/* Open Graph Helmet Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KIMMOTECHNOLOGY" />
        <meta
          property="og:description"
          content="Explore the forefront of technology at KIMMOTECH. Stay updated with the latest tech news, innovations, and cutting-edge developments. Unleash your curiosity and fuel your passion for the future of technology. Join us on a thrilling journey of knowledge and inspiration. Embrace the tech revolution with us today."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/kimmoramicky/image/upload/v1682442915/techchronicles/Kimmotech_site_mockup_dr1tkk.png"
        />
        <meta property="og:url" content="https://www.kimmotech.blog/" />
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
                <div className="col-lg-6">
                  {blogs?.slice(13, 15).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                      key={blog.slug}
                    >
                      <img
                        className="img-fluid"
                        src={blog.image}
                        alt={blog.name}
                        width={135}
                      />
                      <div className=" w-100 h-100 px-2 d-flex flex-column justify-content-center border border-left-0">
                        <div className="">
                          <div className="">
                            <Link
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                              to={{
                                pathname: '/search',
                                search: `category=${blog.category}`,
                              }}
                            >
                              {blog.category}
                            </Link>
                          </div>
                          <a className="text-body" href="/">
                            <small>
                              <small>
                                {moment(blog.createdAt).format('MMMM Do YYYY')}
                              </small>
                            </small>
                          </a>
                        </div>
                        <div className="truncate-overflow-3 w-100">
                          <Link
                            className="m-0 text-secondary text-uppercase font-weight-bold lh"
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
                  {blogs?.slice(15, 17).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                      key={blog.slug}
                    >
                      <img
                        className="img-fluid"
                        src={blog.image}
                        alt={blog.name}
                        width={135}
                      />
                      <div className="w-100 h-100 px-2 d-flex flex-column justify-content-center border border-left-0">
                        <div className="">
                          <div className="">
                            <Link
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                              to={{
                                pathname: '/search',
                                search: `category=${blog.category}`,
                              }}
                            >
                              {blog.category}
                            </Link>
                          </div>
                          <a className="text-body" href="/">
                            <small>
                              <small>
                                {moment(blog.createdAt).format('MMMM Do YYYY')}
                              </small>
                            </small>
                          </a>
                        </div>
                        <div className="truncate-overflow-3">
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

                <div className="col-lg-12">
                  {blogs?.slice(18, 19).map((blog) => (
                    <div className="row news-lg mx-0 mb-3" key={blog.slug}>
                      <div className="col-md-6 h-100 px-0">
                        <img
                          className="img-fluid w-100 h-100"
                          src={blog.image}
                          alt={blog.name}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-6 d-flex flex-column border bg-white h-100 px-0">
                        <div className="mt-auto p-4">
                          <div className="mb-2">
                            <Link
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                              to={{
                                pathname: '/search',
                                search: `category=${blog.category}`,
                              }}
                            >
                              {blog.category}
                            </Link>
                            <a className="text-body" href="/">
                              <small>
                                {moment(blog.createdAt).format('MMMM Do YYYY')}
                              </small>
                            </a>
                          </div>
                          <div className="truncate-overflow">
                            <Link
                              className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                              to={`/article/${blog.slug}`}
                            >
                              {blog.name}
                            </Link>
                          </div>
                          <div className="truncate-overflow-4">
                            <p className="m-0">{blog.smallPost}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between bg-white border-top mt-auto p-4">
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
                    </div>
                  ))}
                </div>

                <div className="col-lg-6">
                  {blogs?.slice(19, 21).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                      key={blog.slug}
                    >
                      <img
                        className="img-fluid"
                        src={blog.image}
                        alt={blog.name}
                        width={135}
                      />
                      <div className="w-100 h-100 px-2 d-flex flex-column justify-content-center border border-left-0">
                        <div className="">
                          <div className="">
                            <Link
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                              to={{
                                pathname: '/search',
                                search: `category=${blog.category}`,
                              }}
                            >
                              {blog.category}
                            </Link>
                          </div>
                          <a className="text-body" href="/">
                            <small>
                              <small>
                                {moment(blog.createdAt).format('MMMM Do YYYY')}
                              </small>
                            </small>
                          </a>
                        </div>
                        <div className="truncate-overflow-3">
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
                  {blogs?.slice(21, 23).map((blog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-3"
                      style={{ height: '110px' }}
                      key={blog.slug}
                    >
                      <img src={blog.image} alt={blog.name} width={135} />
                      <div className="w-100 h-100 px-2 d-flex flex-column justify-content-center border border-left-0">
                        <div className="">
                          <div className="">
                            <Link
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                              to={{
                                pathname: '/search',
                                search: `category=${blog.category}`,
                              }}
                            >
                              {blog.category}
                            </Link>
                          </div>
                          <a className="text-body" href="/">
                            <small>
                              {moment(blog.createdAt).format('MMMM Do YYYY')}
                            </small>
                          </a>
                        </div>
                        <div className="truncate-overflow-3">
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
            </div>

            <WidgetScreen />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
