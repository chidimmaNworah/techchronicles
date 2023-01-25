import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { API_URL } from '../utils';
axios.defaults.withCredentials = true;

function Discount(props) {
  const { discount } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === discount._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${API_URL}/api/discounts/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Discount is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="product-box">
      <Link to={`/discount/${discount.slug}`}>
        <img
          src={discount.image}
          alt={discount.name}
          className="card-img-top"
        />
      </Link>
      <Card.Body>
        <Link to={`/discount/${discount.slug}`}>
          <h6 className="product-component-name">{discount.name}</h6>
        </Link>

        {/* <Rating rating={discount.rating} numReviews={discount.numReviews} /> */}
        <Card.Text>{discount.discount}% Off</Card.Text>
        <Card.Text>₦{discount.price}</Card.Text>

        {discount.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(discount)}>
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </div>
  );
}

export default Discount;
