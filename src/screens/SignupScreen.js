import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          onChange={(e) => setPassword(e.target.value)}
          controlId="password"
        >
          <Form.Label>Password</Form.Label>
          <div className="d-flex">
            <Form.Control type={passwordShown ? 'text' : 'password'} required />
            <i className="fas fa-eye" onClick={togglePassword} />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <div className="d-flex">
            <Form.Control
              type={confirmPasswordShown ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i className="fas fa-eye" onClick={toggleconfirmPassword} />
          </div>
        </Form.Group>
        <PasswordChecklist
          rules={['minLength', 'match']}
          minLength={8}
          value={password}
          valueAgain={confirmPassword}
          onChange={(isValid) => {}}
        />
        {msg && <div className="mb-3">{msg}</div>}
        {error && <div className="mb-3">{error}</div>}
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          New customer? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
}
