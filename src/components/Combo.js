import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { API_URL } from '../utils';
axios.defaults.withCredentials = true;

function Combo(props) {
  const { combo } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === combo._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${API_URL}/api/combos/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. This is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="product-box">
      <Link to={`/combo/${combo.slug}`}>
        <img src={combo.image} alt={combo.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/combo/${combo.slug}`}>
          <h6 className="product-component-name">{combo.name}</h6>
        </Link>

        {/* <Rating rating={combo.rating} numReviews={combo.numReviews} /> */}
        <Card.Text>₦{combo.price}</Card.Text>
        {combo.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(combo)}>Add to Cart</Button>
        )}
      </Card.Body>
    </div>
  );
}

export default Combo;
