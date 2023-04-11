import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../utils';
import { toast } from 'react-toastify';
axios.defaults.withCredentials = true;

function NewsLetter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/api/newsletter/signup`, {
        email,
      });
      setEmail('');
      setMsg(data.message);
      setError(data.error);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mb-3">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">Newsletter</h4>
      </div>
      <div className="bg-white text-center border border-top-0 p-3">
        <p>Sign up to our Newsletter to never miss a latest update</p>
        <form
          className="input-group mb-2"
          style={{ width: '100%' }}
          onSubmit={submitHandler}
        >
          <input
            className="form-control form-control-lg"
            placeholder="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="input-group-append">
            <button className="btn btn-primary font-weight-bold px-3">
              Sign Up
            </button>
          </div>
        </form>
        {msg && (
          <div className="mb-3 text-primary">
            <small>Your email is saved!</small>
          </div>
        )}
        {error && <div className="mb-3">{error}</div>}
      </div>
    </div>
  );
}

export default NewsLetter;
