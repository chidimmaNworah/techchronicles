import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import PasswordChecklist from 'react-password-checklist';
import { API_URL } from '../utils';
axios.defaults.withCredentials = true;

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!PasswordChecklist) {
      toast.error('Password is Invalid');
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/users/signup`, {
        name,
        email,
        password,
      });
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setMsg(data.message);
      setError(data.error);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleconfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  return (
    <Container className="small-container">
      <Helmet>
        <head>
          <title>Sign Up</title>
        </head>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <form className=" mb-2" onSubmit={submitHandler}>
        <div className="border-bottom">
          <input
            placeholder="Your Name"
            className="password-input border-0"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="d-flex justify-content-between align-items-center border-bottom">
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

        <div className="d-flex justify-content-between align-items-center border-bottom mb-4">
          <input
            placeholder="Confirm Your Password"
            className="password-input border-0"
            type={confirmPasswordShown ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <i
            className={confirmPasswordShown ? 'fas fa-eye-slash' : 'fas fa-eye'}
            onClick={toggleconfirmPassword}
          />
        </div>
        <PasswordChecklist
          rules={['minLength', 'match']}
          minLength={8}
          value={password}
          valueAgain={confirmPassword}
          onChange={(isValid) => {}}
        />
        {msg && <div className="mb-3 mt-3">{msg}</div>}
        {error && <div className="mb-3 mt-3">{error}</div>}
        <div className="mb-3 mt-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </form>
    </Container>
  );
}
