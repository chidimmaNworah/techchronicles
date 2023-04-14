import React, { useEffect, useState } from 'react';
import Socials from './Socials';
import PopularNews from './PopularNews';
import NewsLetter from './NewsLetter';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL, getError } from '../utils';
import { Link } from 'react-router-dom';

export default function WidgetScreen() {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="col-lg-4">
      <Socials />

      <div className="mb-3">
        <div className="section-title mb-0">
          <h4 className="m-0 text-uppercase font-weight-bold">Advertisement</h4>
        </div>
        <div className="bg-white text-center border border-top-0 p-3">
          <a
            href="https://www.kimmotechnology.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/kimmoramicky/image/upload/v1681296838/Adverts/tech_small_banner_hhyzat.png"
              alt="kimmotechnology"
            />
          </a>
        </div>
      </div>

      <PopularNews />

      <NewsLetter />

      <div className="mb-3">
        <div className="section-title mb-0">
          <h4 className="m-0 text-uppercase font-weight-bold">Tags</h4>
        </div>
        <div className="bg-white border border-top-0 p-3">
          <div className="d-flex flex-wrap m-n1">
            {categories
              ?.slice(0, 12)
              .reverse()
              .map((category) => (
                <Link
                  className="btn btn-sm btn-outline-secondary m-1"
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
      </div>
    </div>
  );
}
