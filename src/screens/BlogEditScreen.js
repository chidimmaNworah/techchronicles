import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError, API_URL } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
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
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [smallPost, setSmallPost] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`${API_URL}/api/blogs/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setImage(data.image);
        setCategory(data.category);
        setPost(data.post);
        setSmallPost(data.smallPost);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(post);
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `${API_URL}/api/blogs/${productId}`,
        {
          _id: productId,
          name,
          slug,
          image,
          category,
          post,
          smallPost,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Blog post updated successfully');
      navigate('/admin/blogs');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit Blog Post ${productId}</title>
      </Helmet>
      <h1>Edit Blog Post {productId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="post">
            <Form.Label>Post</Form.Label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={post}
              onChange={(newValue) => setPost(newValue)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="smallPost">
            <Form.Label>Small Post</Form.Label>
            <Form.Control
              value={smallPost}
              onChange={(e) => setSmallPost(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
