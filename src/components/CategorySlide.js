import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

export default function CategorySlide() {
  const data = {
    categories: [
      {
        _id: 1,
        name: 'Nail Art',
        image: '/images/nailart.jpg',
        buttonLink: '/nailarts',
      },
      {
        _id: 2,
        name: 'Designs & Tools',
        image: '/images/tools.jpg',
        buttonLink: '/tools',
      },
      {
        _id: 3,
        name: 'Combo',
        image: '/images/combo_1.jpg',
        buttonLink: '/combos',
      },
    ],
  };

  return (
    <div className="">
      <div className="container category-box">
        {data.categories?.map((product) => (
          <div key={product._id}>
            <Link to={product.buttonLink}>
              <div className="category-box-inner">
                <img src={product.image} alt="categoryimg " width={50} />
                <h6 className="">{product.name}</h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
