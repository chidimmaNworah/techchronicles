import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError, API_URL } from '../utils';
axios.defaults.withCredentials = true;

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [msg, setMsg] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/users/signin`, {
        email,
        password,
      });
      setMsg(data.message);
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <Container className="small-container">
      <Helmet>
        <head>
          <title>Sign In</title>
        </head>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="border-bottom">
          <input
            placeholder="Your Email"
            className="password-input border-0"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-between align-items-center border-bottom mb-4">
          <input
            placeholder="Enter Your Password"
            className="password-input border-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            controlId="password"
            type={passwordShown ? 'text' : 'password'}
            required
          />
          <div>
            <i
              className={passwordShown ? 'fas fa-eye-slash' : 'fas fa-eye'}
              onClick={togglePassword}
            />
          </div>
        </div>
        {msg && <div className="mb-3">{msg}</div>}
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New User?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        <div className="mb-3">
          <Link to={`/forgot-password?redirect=${redirect}`}>
            <Button variant="dark">Forgot Password?</Button>
          </Link>
        </div>
      </form>
    </Container>
  );
}
