import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { API_URL } from '../utils';
axios.defaults.withCredentials = true;

function Tools(props) {
  const { tool } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === tool._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${API_URL}/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. This tool is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="product-box">
      <Link to={`/product/${tool.slug}`}>
        <img src={tool.image} alt={tool.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${tool.slug}`}>
          <h6 className="product-component-name">{tool.name}</h6>
        </Link>
        {/* <Rating rating={tool.rating} numReviews={tool.numReviews} /> */}
        <Card.Text>₦{tool.price}</Card.Text>
        {tool.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(tool)}>Add to Cart</Button>
        )}
      </Card.Body>
    </div>
  );
}

export default Tools;
