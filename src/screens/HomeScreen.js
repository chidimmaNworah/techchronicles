import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet-async';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  BestSelling,
  CarouselSlide,
  CategorySlide,
  MaylikeProducts,
  NewProducts,
  TrendingProducts,
} from '../components';

function HomeScreen() {
  return (
    <>
      <Helmet>
        <title>Nails Republic Online Store</title>
      </Helmet>
      <div className="header-container">
        <CarouselSlide />
      </div>

      <Container>
        <Link to="/allproducts">
          <div className="text-center">
            <h2 className="homescreen-heading"> Top Categories</h2>
          </div>
        </Link>
        <div>
          <CategorySlide />
        </div>

        <NewProducts />
      </Container>

      <div className="deal-of-the-day">
        <Container>
          <h1>Deal Of The Day</h1>
          <h4>Save Up to 40% Off!</h4>
          <p>
            Save up to 40% on all Nails Republic Accessories. Shop all
            Categories of our nailart products for ass low as ₦400. Buy products
            worth ₦15,000.00 and save up to 80% of service and delivery fees. No
            more hassle of nail fashion, we are here for you!!!
          </p>
          <Link to="/discounts">
            <Button className="other-button">Shop Now</Button>
          </Link>
        </Container>
      </div>

      <Container>
        <TrendingProducts />

        <div className="placements">
          <div className="placement1">
            <div>
              <h4 className="placement-text">
                Save up to 23% on Nail Accessories
              </h4>
              <Link to="/discounts">
                <Button className="">Shop Now</Button>
              </Link>
            </div>
          </div>
          <div className="placement2">
            <div className="placement2-inner">
              <h4 className="placement-text">New season Nail art sales</h4>
              <Link to="/nailarts">
                <Button className="">Shop Now</Button>
              </Link>
            </div>
            <div className="placement2-inner2">
              <div className="div-parts">
                <h5 className="placement-text">
                  The best Nail Accessories Combo Online
                </h5>
                <Link to="/combos">
                  <Button className="">Shop Now</Button>
                </Link>
                <div className="combo-img"></div>
              </div>
              <div className="div-parts">
                <h5 className="placement-text">
                  Glow up your nails with the perfect treatment
                </h5>
                <Link
                  to={{ pathname: '/search', search: `category='treatment'` }}
                >
                  <Button className="">Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <BestSelling />
      </Container>

      <MaylikeProducts />
    </>
  );
}

export default HomeScreen;
