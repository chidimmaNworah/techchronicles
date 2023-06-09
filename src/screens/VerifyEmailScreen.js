import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError, API_URL } from '../utils';
import { Store } from '../Store';
axios.defaults.withCredentials = true;

export default function VerifyEmailScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const [validUrl, setValidUrl] = useState(true);

  const { id, token } = params;

  const [msg, setMsg] = useState('');

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = await axios.get(
          `${API_URL}/api/users/${id}/verify/${token}`
        );
        console.log(url);

        setValidUrl(true);
        setMsg(url.message);
      } catch (error) {
        getError(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Kimmotechnology Blog Email Verification</title>
      </Helmet>
      {validUrl ? (
        <div className="d-flex justify-content-center flex-column text-center">
          <h1 className="mb-5">Email Verified successfully</h1>
          {msg && <div className="mb-3">{msg}. Please Login below</div>}
          <Link
            to="/signin
          "
          >
            <Button>Login</Button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Container>
  );
}
