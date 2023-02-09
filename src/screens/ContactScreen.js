import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { getError, API_URL } from '../utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
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
      <div className="contact-main">
        <div id="contact_info" className="contact-info">
          <div className="">
            <h4 className="text-white mb-4">CONTACT INFO</h4>
          </div>
          {/* name */}
          <div className="mt-6 d-flex gap-2 align-items-center">
            <p className="text-white text-xs">
              <i className="fas fa-user-tie"></i> Name :
            </p>
            <p className="text-white text-xs">Customer Service</p>
          </div>
          {/* email */}
          <div className="d-flex gap-2 align-items-center">
            <p className="text-white text-xs">
              <i className="fas fa-envelope-square"></i> Email :
            </p>
            <p>
              <a
                className="text-white text-xs no-underline"
                href="mailto:info@nailsrepublic.com"
              >
                info@nailsrepublic.com
              </a>
            </p>
          </div>
          {/* Phone */}
          <div className="d-flex gap-2 align-items-center">
            <p className="text-white text-xs">
              <i className="fas fa-phone-volume"></i> Phone :
            </p>
            <p>
              <a
                className="text-white text-xs no-underline"
                href="tel:+234 907 036 1277"
              >
                +234 906 310 6069
              </a>
            </p>
          </div>
          {/* Address */}
          <div className="d-flex gap-2 align-items-center">
            <p className="text-white text-xs">
              <i className="fas fa-map-signs"></i> Address :
            </p>
            <p>
              <a
                className="text-white text-xs no-underline "
                href="https://maps.google.com/jotvpKsh28aaXBEVA"
              >
                Central Business District, Abuja 900211
              </a>
            </p>
          </div>
        </div>
        <div className="contact-info-2">
          <form id="contact_us" onSubmit={submitHandler}>
            <div className="">
              <h4 className="text-green-700">GET IN TOUCH</h4>
            </div>
            <input
              type="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="contact-main-2"
              autoFocus
            />
            <br />
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="contact-main-2"
            />
            <br />
            <input
              type="subject"
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="contact-main-2"
            />
            <br />
            <textarea
              type="message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your Message here"
            />
            <br />
            <Button type="submit" variant="primary">
              Send message
            </Button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}
