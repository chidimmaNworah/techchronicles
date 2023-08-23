import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Helmet>
        <head>
          <title>About Kimmotechnology</title>
        </head>
      </Helmet>
      <h1 className="text-center mb-4">About Kimmotech Blog</h1>
      <Row>
        <Col md={12}>
          <p className="text-justify mb-4">
            Welcome to Kimmotech Blog, your go-to destination for all things
            technology. Our passion for innovation and curiosity about the
            latest trends in the tech world inspired us to create this platform.
            We strive to provide you with engaging and informative content that
            will keep you updated with the fast-paced tech industry.
          </p>
          <p className="text-justify mb-4">
            Our mission is to bridge the gap between technology and everyday
            life. We believe that technology has the power to transform the
            world positively and make our lives better. Through our blog posts,
            we aim to bring you closer to cutting-edge advancements,
            groundbreaking research, and futuristic gadgets that shape the
            future.
          </p>
          <p className="text-justify mb-4">
            Our team of tech enthusiasts and experts is dedicated to delivering
            well-researched and compelling articles that explore the forefront
            of innovation. We cover a wide range of topics, including AI,
            robotics, cybersecurity, space exploration, and much more. Whether
            you are a tech enthusiast, a professional in the industry, or simply
            curious about the latest tech trends, Kimmotech Blog has something
            for you.
          </p>
          <p className="text-justify mb-4">
            We value your feedback and encourage you to be an active part of our
            community. Feel free to share your thoughts and insights in the
            comments section, and don't forget to subscribe to our newsletter
            for the latest updates and exclusive content.
          </p>
          <p className="text-justify mb-4">
            Thank you for joining us on this thrilling journey of knowledge and
            inspiration. Together, let's embrace the tech revolution and shape a
            brighter future powered by technology.
          </p>
          <div className="text-center">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
