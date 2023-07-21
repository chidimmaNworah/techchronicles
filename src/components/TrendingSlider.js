import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import logger from 'use-reducer-logger';

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

export default function TrendingSlider() {
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
    <div className="container-fluid bg-white py-3 mb-3">
      <div className="container">
        <div className="row align-items-center bg-white">
          <div className="col-12">
            <div className="d-flex justify-content-start">
              <div
                className="bg-primary text-dark text-center font-weight-medium py-1"
                style={{ width: '70px', fontSize: '12px' }}
              >
                Trending
              </div>
              <div
                className="position-relative d-inline-flex align-items-center justify-content-start ml-1"
                style={{
                  width: 'calc(100% - 70px)',
                  paddingRight: '5px',
                }}
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
                    <SwiperSlide
                      key={blog.slug}
                      className="justify-content-start"
                    >
                      <div className="text-truncate text-left">
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="text-black text-uppercase"
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
  );
}
