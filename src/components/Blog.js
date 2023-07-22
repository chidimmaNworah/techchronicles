import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from 'moment';
axios.defaults.withCredentials = true;

function Blog(props) {
  const { blog } = props;

  return (
    <div className="product-box">
      <Link to={`/article/${blog.slug}`}>
        <img src={blog.image} alt={blog.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link
          to={{
            pathname: '/search',
            search: `category=${blog.category}`,
          }}
        >
          {blog.category}
        </Link>
        <Link to={`/article/${blog.slug}`}>
          <h6 className="product-component-name">{blog.name}</h6>
        </Link>
        <small>{moment(blog.createdAt).format('MMMM Do YYYY')}</small>

        <div className="d-flex align-items-center">
          <small className="">
            <i className="far fa-eye mr-2"></i>
            {blog.views}
          </small>
          <small className="ml-3">
            <i className="far fa-comment mr-2"></i>
            {blog.numReviews}
          </small>
        </div>
      </Card.Body>
    </div>
  );
}

export default Blog;
