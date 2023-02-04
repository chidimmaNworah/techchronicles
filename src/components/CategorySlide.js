import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

export default function CategorySlide() {
  const data = {
    categories: [
      {
        _id: 1,
        name: 'Nail Art',
        image:
          'https://res.cloudinary.com/kimmoramicky/image/upload/v1674654836/nailsrepublic/nailart_ldamyn.jpg',
        buttonLink: '/nailarts',
      },
      {
        _id: 2,
        name: 'Designs & Tools',
        image:
          'https://res.cloudinary.com/kimmoramicky/image/upload/v1674654836/nailsrepublic/tools_pmyth8.jpg',
        buttonLink: '/tools',
      },
      {
        _id: 3,
        name: 'Combo',
        image: '/images/IMG_2042.PNG',
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
