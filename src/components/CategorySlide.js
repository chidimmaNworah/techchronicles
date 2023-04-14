import React, { useEffect, useReducer } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import moment from 'moment';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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

export default function CategorySlide() {
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
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid pt-3 mb-3">
      <div className="section-title">
        <h4 className="m-0 text-uppercase font-weight-bold">Featured News</h4>
      </div>
      <Swiper
        // slidesPerView={4}
        spaceBetween={30}
        breakpoints={{
          480: {
            // width: 640,
            slidesPerView: 1,
          },
          768: {
            // width: 640,
            slidesPerView: 2,
          },
          1024: {
            // width: 640,
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{
          delay: 9500,
          disableOnInteraction: false,
        }}
        // loop={true}
        // modules={[Pagination]}
        className="mySwiper"
      >
        <div className="news-carousel carousel-item-4 position-relative">
          {blogs?.slice(21, 24).map((blog) => (
            <SwiperSlide
              className="position-relative overflow-hidden"
              style={{ height: '500px' }}
              key={blog._id}
            >
              <img
                className="img-fluid h-100"
                alt=""
                src={blog.image}
                style={{ objectFit: 'cover' }}
              />
              <div className="overlay">
                <div className="mb-2">
                  <Link
                    to={{
                      pathname: '/search',
                      search: `category=${blog.category}`,
                    }}
                    className="bg-primary text-dark text-center font-weight-medium py-2 px-1"
                  >
                    {blog.category}
                  </Link>
                  <a className="text-white" href="/">
                    <small>
                      {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </small>
                  </a>
                </div>
                <div className="truncate">
                  <Link
                    to={`/article/${blog.slug}`}
                    className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                  >
                    {blog.name}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
