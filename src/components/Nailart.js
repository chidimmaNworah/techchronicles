import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { API_URL } from '../utils';
axios.defaults.withCredentials = true;

function Nailart(props) {
  const { nailart } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === nailart._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${API_URL}/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. nailart is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="product-box">
      <Link to={`/product/${nailart.slug}`}>
        <img src={nailart.image} alt={nailart.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${nailart.slug}`}>
          <h6 className="product-component-name">{nailart.name}</h6>
        </Link>

        {/* <Rating rating={nailart.rating} numReviews={nailart.numReviews} /> */}
        <Card.Text>${nailart.price}</Card.Text>
        {nailart.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(nailart)}>Add to Cart</Button>
        )}
      </Card.Body>
    </div>
  );
}

export default Nailart;
