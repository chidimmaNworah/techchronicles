import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError, API_URL } from '../utils';
import { Link, useParams } from 'react-router-dom';
import TrendingSlider from '../components/TrendingSlider';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Socials from '../components/Socials';
import NewsLetter from '../components/NewsLetter';
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, blog: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, blog: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_RELATED_SUCCESS':
      return { ...state, loading: false, relatedBlogs: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [comment, setComment] = useState('');
  const [categories, setCategories] = useState([]);

  // const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [
    { loading, error, blog, loadingCreateReview, relatedBlogs },
    dispatch,
  ] = useReducer(reducer, {
    blog: [],
    loading: true,
    error: '',
    relatedBlogs: [],
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blogs/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`${API_URL}/api/blogs/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });

        if (result.data.category) {
          const relatedResult = await axios.get(
            `${API_URL}/api/blogs/related/${result.data.category}/${result.data.slug}`
          );
          dispatch({
            type: 'FETCH_RELATED_SUCCESS',
            payload: relatedResult.data,
          });
          console.log(relatedBlogs);
        } else {
          dispatch({ type: 'FETCH_RELATED_SUCCESS', payload: [] });
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err.message) });
      }
    };
    fetchData();
  }, [slug]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment) {
      toast.error('Please enter comment');
      return;
    }
    try {
      const { data } = await axios.post(
        `${API_URL}/api/blogs/${blog._id}/reviews`,
        { comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review Submitted Successfully');
      blog.reviews.unshift(data.review);
      blog.numReviews = data.numReviews;
      dispatch({ type: 'REFRESH_PRODUCT', payload: blog });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <head>
          <title>{`KIMMOTECH - ${blog.name}`}</title>

          {/* Open Graph Helmet Meta Tags */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={blog.name} />
          <meta property="og:description" content={blog.smallPost} />
          <meta property="og:image" content={blog.image} />
          <meta property="og:url" content={`/article/${blog.slug}`} />

          {/* Twitter Helmet Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={blog.name} />
          <meta name="twitter:description" content={blog.smallPost} />
          <meta name="twitter:image" content={blog.image} />
          <meta name="twitter:site" content="@kimmotechnology" />
          <meta name="twitter:url" content={`/article/${blog.slug}`} />
        </head>
      </Helmet>

      <div className="container-fluid">
        <div className="container">
          <TrendingSlider />
          <div className="row">
            <div className="col-lg-8">
              <div className="position-relative mb-3">
                <img
                  className="img-fluid w-100"
                  src={blog.image}
                  alt={blog.name}
                  style={{ objectFit: 'cover' }}
                />
                <div className="bg-white border border-top-0 p-4">
                  <div className="mb-3">
                    <Link
                      className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      to={{
                        pathname: '/search',
                        search: `category=${blog.category}`,
                      }}
                    >
                      {blog.category}
                    </Link>
                    <a className="text-body" href="/">
                      {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </a>
                  </div>
                  <h2 className="mb-3 text-secondary text-uppercase font-weight-semibold">
                    {blog.name}
                  </h2>
                  <div
                    className="responsive-photo"
                    dangerouslySetInnerHTML={{ __html: blog.post }}
                  ></div>
                </div>

                <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                  {!blog.user ? (
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle mr-2"
                        src="https://res.cloudinary.com/kimmoramicky/image/upload/v1681199111/kimmora_qiefbe.png"
                        width="25"
                        height="25"
                        alt="author"
                      />
                      <span>Kimmora</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle mr-2"
                        src={blog.user.images[0]}
                        width="25"
                        height="25"
                        alt="author"
                      />
                      <span>{blog.user.name}</span>
                    </div>
                  )}
                  <div className="d-flex align-items-center">
                    <span className="ml-3">
                      <i className="far fa-eye mr-2"></i>
                      {blog.views}
                    </span>
                    <span className="ml-3">
                      <i className="far fa-comment mr-2"></i>
                      {blog.numReviews}
                    </span>
                  </div>
                </div>

                {/* Comment start */}
                {blog.reviews?.map((review) => (
                  <div className="mb-3 mt-3" key={review.comment}>
                    <div className="section-title mb-0">
                      <h4
                        ref={reviewsRef}
                        className="m-0 text-uppercase font-weight-bold"
                      >
                        {blog.numReviews} Comments
                      </h4>
                    </div>
                    <div className="bg-white border border-top-0 p-4">
                      <div className="media mb-4">
                        <div className="media-body">
                          <h6>
                            <a
                              className="text-secondary font-weight-bold"
                              href="/"
                            >
                              {review.name}{' '}
                            </a>
                            <small>
                              <i>
                                Posted on{' '}
                                {moment(review.createdAt).format(
                                  'MMMM Do YYYY'
                                )}
                              </i>
                            </small>
                          </h6>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Comment Start Form */}
                {userInfo ? (
                  <div className="mb-3 mt-3">
                    <div className="section-title mb-0">
                      <h4 className="m-0 text-uppercase font-weight-bold">
                        Leave a comment
                      </h4>
                    </div>
                    <div className="bg-white border border-top-0 p-4">
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <label htmlFor="message">Comment *</label>
                          <textarea
                            id="message"
                            placeholder="Leave a comment here"
                            value={comment}
                            className="form-control"
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="form-group mb-0">
                          <Button
                            disabled={loadingCreateReview}
                            type="submit"
                            value="Leave a comment"
                            className="btn btn-primary font-weight-semi-bold py-2 px-3"
                          >
                            Submit
                          </Button>
                          {loadingCreateReview && <LoadingBox></LoadingBox>}
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <MessageBox>
                    Please{' '}
                    <Link to={`/signin?redirect=/article/${blog.slug}`}>
                      Sign In
                    </Link>{' '}
                    to write a comment
                  </MessageBox>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <Socials />

              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Advertisement
                  </h4>
                </div>
                <div className="bg-white text-center border border-top-0 p-3">
                  <a
                    href="https://www.kimmotechnology.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="img-fluid"
                      src="https://res.cloudinary.com/kimmoramicky/image/upload/v1681296838/Adverts/tech_small_banner_hhyzat.png"
                      alt="kimmotechnology"
                    />
                  </a>
                </div>
              </div>

              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Related News
                  </h4>
                </div>
                <div className="bg-white border border-top-0 p-2">
                  {relatedBlogs?.slice(0, 5).map((relatedBlog) => (
                    <div
                      className="d-flex align-items-center bg-white mb-1 w-100"
                      style={{ height: '110px' }}
                      key={relatedBlog._id} // Use the unique ID or slug as the key
                    >
                      <img
                        className="img-fluid"
                        src={relatedBlog.image}
                        alt="article"
                        width={100}
                      />
                      <div className="w-100 h-100 pl-2 d-flex flex-column justify-content-center">
                        <div className="mb-1">
                          <a className="text-body" href="/">
                            <small>
                              {moment(relatedBlog.createdAt).format(
                                'MMMM Do YYYY'
                              )}
                            </small>
                          </a>
                        </div>
                        <div className="w-100 truncate-overflow-3">
                          <Link
                            className="m-0 text-secondary font-weight-bold"
                            to={`/article/${relatedBlog.slug}`}
                          >
                            {relatedBlog.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <NewsLetter />

              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">Tags</h4>
                </div>
                <div className="bg-white border border-top-0 p-3">
                  <div className="d-flex flex-wrap m-n1">
                    {categories
                      ?.slice(0, 12)
                      .reverse()
                      .map((category) => (
                        <Link
                          className="btn btn-sm btn-outline-secondary m-1"
                          to={{
                            pathname: '/search',
                            search: `category=${category}`,
                          }}
                          key={category}
                        >
                          {category}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
