import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { getError, API_URL } from '../utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { NewsLetter } from '../components';
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false, error: action.payload };
    default:
      return state;
  }
};

export default function ContactScreen() {
  const [dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/users/message`, {
        name,
        email,
        subject,
        message,
      });
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
      toast.success('Your message has been sent');
      navigate('/contact');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="contact">
      <Helmet>
        <title>Contact Us | Nail Republic</title>
      </Helmet>

      <div className="container-fluid mt-5 pt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title mb-0">
                <h4 className="m-0 text-uppercase font-weight-bold">
                  Contact Us For Any Queries
                </h4>
              </div>
              <div className="bg-white border border-top-0 p-4 mb-3">
                <div className="mb-4">
                  <h6 className="text-uppercase font-weight-bold">
                    Contact Info
                  </h6>
                  <p className="mb-4">
                    Welcome to the Kimmotech Blog. The purpose of this blog is
                    to enable the sharing of technical information, insights,
                    events, and inspiration among software developers and
                    various individuals within the Tech community and
                    externally. <br /> <br /> Have something you want us to know
                    about? Let us hear your suggestions, comments and concerns
                    by filling out the form below:
                  </p>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fa fa-map-marker-alt text-primary mr-2"></i>
                      <h6 className="font-weight-bold mb-0">Our Office</h6>
                    </div>
                    <p className="m-0">
                      18 Shettima Ngiladar Street, Abuja, Nigeria
                    </p>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fa fa-envelope-open text-primary mr-2"></i>
                      <h6 className="font-weight-bold mb-0">Email Us</h6>
                    </div>
                    <p className="m-0">info@example.com</p>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fa fa-phone-alt text-primary mr-2"></i>
                      <h6 className="font-weight-bold mb-0">Call Us</h6>
                    </div>
                    <p className="m-0">+234 906 310 6069</p>
                  </div>
                </div>
                <h6 className="text-uppercase font-weight-bold mb-3">
                  Contact Us
                </h6>
                <form id="contact_us" onSubmit={submitHandler}>
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="name"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="form-control p-4"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                          className="form-control p-4"
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="subject"
                      name="subject"
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                      className="form-control p-4"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      type="message"
                      name="message"
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Message"
                      rows="4"
                      required="required"
                    />
                  </div>
                  <div>
                    <Button
                      className="btn btn-primary font-weight-semi-bold px-4"
                      style={{ height: '50px' }}
                      type="submit"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Follow Us
                  </h4>
                </div>
                <div className="bg-white border border-top-0 p-3">
                  <a
                    href="https://web.facebook.com/100084215682240/"
                    target="_blank"
                    rel="noreferrer"
                    className="d-block w-100 text-white text-decoration-none mb-3"
                    style={{ background: '#39569E' }}
                  >
                    <i
                      className="fab fa-facebook-f text-center py-4 mr-3"
                      style={{ width: '65px', background: 'rgba(0, 0, 0, .2)' }}
                    ></i>
                    <span className="font-weight-medium">2,785 Fans</span>
                  </a>
                  <a
                    href="https://twitter.com/kimmotechnology"
                    target="_blank"
                    rel="noreferrer"
                    className="d-block w-100 text-white text-decoration-none mb-3"
                    style={{ background: '#52AAF4' }}
                  >
                    <i
                      className="fab fa-twitter text-center py-4 mr-3"
                      style={{ width: '65px', background: 'rgba(0, 0, 0, .2)' }}
                    ></i>
                    <span className="font-weight-medium">12,345 Followers</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/kimmotech"
                    target="_blank"
                    rel="noreferrer"
                    className="d-block w-100 text-white text-decoration-none mb-3"
                    style={{ background: '#0185AE' }}
                  >
                    <i
                      className="fab fa-linkedin-in text-center py-4 mr-3"
                      style={{ width: '65px', background: 'rgba(0, 0, 0, .2)' }}
                    ></i>
                    <span className="font-weight-medium">5,513 Connects</span>
                  </a>
                  <a
                    href="https://www.instagram.com/kimmotech"
                    target="_blank"
                    rel="noreferrer"
                    className="d-block w-100 text-white text-decoration-none mb-3"
                    style={{ background: '#C8359D' }}
                  >
                    <i
                      className="fab fa-instagram text-center py-4 mr-3"
                      style={{ width: '65px', background: 'rgba(0, 0, 0, .2)' }}
                    ></i>
                    <span className="font-weight-medium">6,345 Followers</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@kimmotech"
                    target="_blank"
                    rel="noreferrer"
                    className="d-block w-100 text-white text-decoration-none mb-3"
                    style={{ background: '#DC472E' }}
                  >
                    <i
                      className="fab fa-youtube text-center py-4 mr-3"
                      style={{ width: '65px', background: 'rgba(0, 0, 0, .2)' }}
                    ></i>
                    <span className="font-weight-medium">
                      1,345 Subscribers
                    </span>
                  </a>
                </div>
              </div>
              <NewsLetter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
