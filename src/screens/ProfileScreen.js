import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError, API_URL } from '../utils';
import LoadingBox from '../components/LoadingBox';
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name || '');
  const [email, setEmail] = useState(userInfo.email || '');
  const [images, setImages] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.put(
        `${API_URL}/api/users/profile`,
        {
          name,
          email,
          images,
          bio,
          password,
          confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully!');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(error) });
      toast.error(getError(error));
    }
    setPassword('');
    setConfirmPassword('');
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       dispatch({ type: 'FETCH_REQUEST' });
  //       const { data } = await axios.get(`${API_URL}/api/blogs/${productId}`);
  //       setName(data.name);
  //       setSlug(data.slug);
  //       setImage(data.image);
  //       setCategory(data.category);
  //       setPost(data.post);
  //       setSmallPost(data.smallPost);
  //       dispatch({ type: 'FETCH_SUCCESS' });
  //     } catch (err) {
  //       dispatch({
  //         type: 'FETCH_FAIL',
  //         payload: getError(err),
  //       });
  //     }
  //   };
  //   fetchData();
  // }, [productId]);

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(`${API_URL}/api/upload`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        // setImage(data.secure_url);
        console.log('nothing');
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <div>
      <Helmet>
        <title>{`${userInfo.name} Profile | Kimmotechnology Blog`}</title>
      </Helmet>
      <Container>
        <h1 className="my-3">User Profile</h1>
        <form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => uploadFileHandler(e, true)}
            />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              placeholder="Write a short description of yourself"
              value={bio}
              className="form-control"
              onChange={(e) => setBio(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
