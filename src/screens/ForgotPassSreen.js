import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError, API_URL } from '../utils';
axios.defaults.withCredentials = true;

export default function ForgotPassScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/forgot-password`,
        {
          email,
        }
      );
      setMsg(data.message);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <h3 className="my-3">Enter Your Email to Reset Password</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        {msg && <div className="mb-3">{msg}</div>}
        <div className="mb-3">
          <Button type="submit">Submit</Button>
        </div>
        <div className="mb-3">
          Or <Link to={`/signin?redirect=${redirect}`}>Sign in?</Link>
        </div>
      </Form>
    </Container>
  );
}
