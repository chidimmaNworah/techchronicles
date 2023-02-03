import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PasswordChecklist from 'react-password-checklist';
import { API_URL } from '../utils';
axios.defaults.withCredentials = true;

export default function ChangePassScreen() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const params = useParams();

  const { id, token } = params;

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
      const { data } = await axios.post(
        `${API_URL}/api/users/${id}/password-reset/${token}`,
        {
          password,
        }
      );
      setMsg(data.message);
      navigate('/signin');
    } catch (err) {
      setError(err);
      toast.error(err.message);
    }
  };

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

      <h1 className="my-3">Enter New Password</h1>
      <Form onSubmit={submitHandler}>
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
          <Button type="submit">Continue</Button>
        </div>
        <div className="mb-3">
          Or? <Link to={`/signin`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
}
