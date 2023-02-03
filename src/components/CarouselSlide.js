import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CarouselSlide() {
  const data = {
    products: [
      {
        name: 'Nail Arts',
        category: 'Classy Nail designs',
        image:
          'https://res.cloudinary.com/kimmoramicky/image/upload/v1674654852/nailsrepublic/1_iej37e.png',
        description:
          'Ready to deliver beautiful ready to use nail art designs right to your door step. Shop with ease and enjoy all our amazing offers in return!',
        buttonLink: '/nailart',
      },
      {
        name: ' ballerina nails',
        category: 'Tools for Nail art',
        image:
          'https://res.cloudinary.com/kimmoramicky/image/upload/v1674654845/nailsrepublic/2_nczcdg.png',
        description:
          'The very best online nail Accessories store for business owners and individuals to shop long lasting, quality and affordable tools for manicure and peducure. Shop Luxury!',
        buttonLink: '/tools',
      },
      {
        name: 'Butterfly long ballerina nails',
        category: 'Top Pick Combos',
        image: '/IMG_2042.PNG',
        description:
          'Shop different products as combos with up to 30% off. Our combos are top picks and are carefully combined based on customer demands. Our combo selection is proof of how much we value our customer needs and expenses.',
        buttonLink: '/combos',
      },
    ],
  };

  return (
    <div>
      <div className="container">
        <Carousel showArrows autoPlay showThumbs={false}>
          {data.products?.map((product) => (
            <div className="carousel-inner text-white" key={product.name}>
              <div className="header-container-left">
                <h2 className="text-white">{product.category}</h2>
                {/* <h4 className="text-white">{product.name}</h4> */}
                <div className="carousel-desc">
                  <p>{product.description}</p>
                </div>
                <Link to={product.buttonLink}>
                  <Button className="first-slide-name outer-slide">
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="carousel-img-wrap">
                <img src={product.image} alt="product" />
              </div>
            </div>
          ))}
          {/* <div className="">
            
            <div className="bg-header"></div>
            <div className="header-container-left">
              <h1>
                NAILS <br />
                REPUBLIC
              </h1>
              <h5>CLASSY ACCESSORIES</h5>
              <p>
                The very best online nail Accessories store, ready to deliver
                quality and pleasant nail products right to your door step. Shop
                with ease and enjoy all our amazing offers in return!
              </p>
              <Link to="/allproducts">
                <Button className="shadow-sm">Shop Now</Button>
              </Link>
            </div>
          </div> */}
        </Carousel>
      </div>
    </div>
  );
}
