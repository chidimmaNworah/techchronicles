import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { MaylikeProducts } from '../components';

export default function about() {
  return (
    <Container className="success-wrapper">
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className="about ">
        <div className="about1">
          <h6>MANICURES AND PEDICURES</h6>
          <h4>See Our Arts in action</h4>
          <p className="about-text">
            To understand the care we put into each piece, you have to see it in
            details.
            <br />
            We have a painstaking attention to detail, quality and construction
            because we see our pieces as a testament to the significance of this
            time. It's the anti "old nails" - it's the uniform for those who
            share our belief that the details and neatness of the nail is the
            most is the most important.
          </p>
        </div>
        <div className="about2">
          <img src="/images/4.PNG" alt="about" />
        </div>
      </div>
      <MaylikeProducts />
    </Container>
  );
}
