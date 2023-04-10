import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper';
import { API_URL } from '../utils';
import logger from 'use-reducer-logger';
import { Link } from 'react-router-dom';
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

export default function CarouselSlide() {
  const [{ loading, error, blogs }, dispatch] = useReducer(logger(reducer), {
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
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  SwiperCore.use([Autoplay]);

  return (
    <div>
      <div className="container-fluid mb-0">
        <div className="row">
          <div className="col-lg-7 px-0">
            <Carousel
              autoPlay
              showThumbs={false}
              infiniteLoop={true}
              className="position-relative main-carousel carousel-main"
            >
              {blogs?.slice(0, 3).map((blog) => (
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: '500px' }}
                >
                  <div
                    className="carousel-main-inner text-white"
                    key={blog.name}
                  >
                    <img
                      src={blog.image}
                      alt="blog"
                      className="img-fluid h-100"
                    />
                    <div className="overlay text-left">
                      <div className="mb-2">
                        <Link
                          to={{
                            pathname: '/search',
                            search: `category=${blog.category}`,
                          }}
                          // className="bg-primary text-dark text-center font-weight-medium py-2"
                        >
                          {blog.category}{' '}
                        </Link>{' '}
                        <br />
                        <a className="text-white" href="/">
                          {moment(blog.createdAt).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </a>
                      </div>
                      <div className="text-left text-truncate w-100 ">
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="h2 m-0 text-white text-left text-uppercase font-weight-bold"
                        >
                          {blog.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="col-lg-5 px-0">
            <div className="row mx-0">
              {blogs?.slice(4, 8).map((blog) => (
                <div className="col-md-6 px-0">
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: '250px' }}
                    key={blog.name}
                  >
                    <img
                      className="img-fluid w-100 h-100"
                      src={blog.image}
                      alt=""
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="overlay p-2">
                      <div className="mb-2">
                        <Link
                          to={{
                            pathname: '/search',
                            search: `category=${blog.category}`,
                          }}
                        >
                          {blog.category}
                        </Link>
                      </div>
                      <div className="text-truncate w-100">
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                        >
                          {blog.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark py-3 mb-3">
        <div className="ml-4">
          <div className="row align-items-center bg-dark">
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <div
                  className="bg-primary text-dark text-center font-weight-medium py-2"
                  style={{ width: '170px' }}
                >
                  Trending
                </div>
                <div
                  className="tranding-carousel position-relative d-inline-flex align-items-center"
                  style={{ width: 'calc(100% - 170px)', paddingRight: '90px' }}
                >
                  <Swiper
                    loop={true}
                    autoplay={{
                      delay: 7500,
                      disableOnInteraction: false,
                    }}
                    className="mySwiper"
                  >
                    {blogs?.map((blog) => (
                      <SwiperSlide>
                        <div className="text-truncate">
                          <Link
                            to={`/blog/${blog.slug}`}
                            className="text-white text-uppercase"
                          >
                            {blog.name}
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
