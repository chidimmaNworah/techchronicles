import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL, getError } from '../utils';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blogs/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(data);
      } catch (err) {
        toast.error(getError(err));
      }
      // setProducts(result.data);
    };
    fetchBlogData();
  }, []);

  return (
    <div className="container-fluid bg-dark pt-5 px-sm-3 px-md-5 mt-5">
      <div className="row py-4">
        <div className="col-lg-3 col-md-6 mb-5">
          <h5 className="mb-4 text-white text-uppercase font-weight-bold">
            Get In Touch
          </h5>
          <p className="font-weight-medium">
            <i className="fa fa-map-marker-alt mr-2"></i>18 Shettima Ngiladar
            Street, Abuja, Nigeria
          </p>
          <p className="font-weight-medium">
            <i className="fa fa-phone-alt mr-2"></i>+234 906 310 6069
          </p>
          <p className="font-weight-medium">
            <i className="fa fa-envelope mr-2"></i>info@techyship.com
          </p>
          <h6 className="mt-4 mb-3 text-white text-uppercase font-weight-bold">
            Follow Us
          </h6>
          <div className="d-flex justify-content-start">
            <a
              className="btn btn-lg btn-secondary btn-lg-square mr-2"
              href="https://twitter.com/kimmotechnology"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn btn-lg btn-secondary btn-lg-square mr-2"
              href="https://web.facebook.com/100084215682240/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn btn-lg btn-secondary btn-lg-square mr-2"
              href="https://www.linkedin.com/company/kimmotech"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              className="btn btn-lg btn-secondary btn-lg-square mr-2"
              href="https://www.instagram.com/kimmotech"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              className="btn btn-lg btn-secondary btn-lg-square"
              href="https://www.youtube.com/@kimmotech"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <h5 className="mb-4 text-white text-uppercase font-weight-bold">
            Popular News
          </h5>
          {blogs?.slice(0, 3).map((blog) => (
            <div className="mb-3" key={blog.name}>
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
                  <small>{moment(blog.createdAt).format('MMMM Do YYYY')}</small>
                </a>
              </div>
              <div className="text-truncate w-100">
                <Link
                  className="small text-body text-uppercase font-weight-medium"
                  to={`/article/${blog.slug}`}
                >
                  {blog.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-3 col-md-6 mb-5">
          <h5 className="mb-4 text-white text-uppercase font-weight-bold">
            Categories
          </h5>
          <div className="m-n1">
            {categories
              ?.slice(0, 18)
              .reverse()
              .map((category) => (
                <Link
                  className="btn btn-sm btn-secondary m-1"
                  to={{
                    pathname: '/search',
                    search: `category=${category}`,
                  }}
                  key={category}
                >
                  {category}
                </Link>
              ))}
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-5">
          <h5 className="mb-4 text-white text-uppercase font-weight-bold">
            Article Photos
          </h5>
          <div className="row">
            {blogs?.slice(0, 6).map((blogPhoto) => (
              <div className="col-4 mb-3" key={blogPhoto.name}>
                <Link to={`/article/${blogPhoto.slug}`}>
                  <img className="w-100" src={blogPhoto.image} alt="" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
