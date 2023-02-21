import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Navbar,
  Nav,
  NavDropdown,
  Badge,
  Container,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from './Store.js';
import {
  HomeScreen,
  MapScreen,
  UserEditScreen,
  UserListScreen,
  OrderListScreen,
  ProductEditScreen,
  ProductListScreen,
  DashboardScreen,
  SearchScreen,
  ProductScreen,
  ProfileScreen,
  OrderScreen,
  OrderHistoryScreen,
  PlaceOrderScreen,
  PaymentMethodScreen,
  CartScreen,
  SigninScreen,
  ShippingAddressScreen,
  SignupScreen,
  ContactScreen,
  AboutScreen,
  AllProducts,
  DiscountProductScreen,
  NailartProductScreen,
  ToolsProductScreen,
  ComboProductScreen,
  VerifyEmailScreen,
  ChangePassScreen,
  ForgotPassScreen,
} from './screens';
import { SearchBox, ProtectedRoute, AdminRoute } from './components';
import { getError, API_URL } from './utils.js';
import axios from 'axios';
import ScrollToTop from './components/ScrollToTop.js';
import NavigationDots from './components/NavigationDots.js';
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false, error: action.payload };
    default:
      return state;
  }
};

function App() {
  const [dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [email, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/users/message`, {
        email,
      });
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
      toast.success('You have been successfully added!');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />

        <header>
          <ScrollToTop />
          <Navbar collapseOnSelect className="nails-nav" expand="lg">
            <Container>
              <LinkContainer eventkey="8" as={Link} to="/">
                <Navbar.Brand>
                  <img src="/web_logo_name.png" alt="logo name" width={110} />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                bg="dark"
                variant="dark"
                className="fas fa-user-tie"
                toogle="collapse"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Nav.Link
                    eventkey="1"
                    as={Link}
                    to="/search"
                    className="nav-link"
                  >
                    All Categories
                  </Nav.Link>

                  <Nav.Link
                    eventkey="2"
                    as={Link}
                    to="/allproducts"
                    className="nav-link"
                  >
                    Products
                  </Nav.Link>
                  <a
                    href="https://calendly.com/nailsrepublic/book-a-nail-appointment"
                    className="nav-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book Appointment
                  </a>
                  <Nav.Link
                    eventkey="3"
                    as={Link}
                    to="/cart"
                    className="nav-link "
                  >
                    <span className="cart-icon">
                      <i className="fas fa-weight-hanging"></i>
                    </span>

                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item eventkey="4" as={Link}>
                          User Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item eventkey="5" as={Link}>
                          Order History
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Nav.Link
                        eventkey="6"
                        as={Link}
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Nav.Link>
                    </NavDropdown>
                  ) : (
                    <Nav.Link
                      eventkey="7"
                      as={Link}
                      className="nav-link"
                      to="/signin"
                    >
                      Sign In
                    </Nav.Link>
                  )}
                  {userInfo && userInfo.isAdmin ? (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  ) : (
                    ''
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <div className="">
            <Routes>
              {/* <ScrollRestoration /> */}
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/:id/password-reset/:token"
                element={<ChangePassScreen />}
              />
              <Route path="/forgot-password" element={<ForgotPassScreen />} />
              <Route
                path="/:id/verify/:token"
                element={<VerifyEmailScreen />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />

              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />

              {/* Admin Routes */}

              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              />

              {/* nailArts */}
              <Route path="/nailarts" element={<NailartProductScreen />} />
              <Route
                path="/nailart/changepage"
                element={<NailartProductScreen />}
              />

              {/* designs and tools */}
              <Route path="/tools" element={<ToolsProductScreen />} />
              <Route
                path="/tools/changepage"
                element={<ToolsProductScreen />}
              />

              {/* Combos */}
              <Route path="/combos" element={<ComboProductScreen />} />
              <Route
                path="/combo/changepage"
                element={<ComboProductScreen />}
              />

              {/* discounts */}
              <Route
                path="/discount/changepage"
                element={<DiscountProductScreen />}
              />
              <Route path="/discounts" element={<DiscountProductScreen />} />

              <Route path="/allproducts/changepage" element={<AllProducts />} />
              <Route path="/allproducts" element={<AllProducts />} />
              <Route path="/changepage" element={<HomeScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
        <footer>
          <NavigationDots className="dotter" />
          <div className="footer-container">
            <div className="footer-support">
              <div className="footer-support1">
                <i className="fas fa-money-check" />
                <div>
                  <h5> MONEY BACK GUARANTEE</h5>
                  <p>Up to 100% money back guarantee</p>
                </div>
              </div>
              <div className="footer-support1">
                <i className="fas fa-user-shield" />
                <div>
                  <h5>24/7 CUSTOMER SUPPORT</h5>
                  <p>Our service is always availble to you</p>
                </div>
              </div>
              <div className="footer-support1">
                <i className="fas fa-shipping-fast" />
                <div>
                  <h5>FAST AND LOW COST DELIVERY</h5>
                  <p>We can find you whenever you are ready!</p>
                </div>
              </div>
            </div>

            <div className="newsletter">
              <h5>JOIN OUR NEWSLETTER</h5>
              <p>
                {' '}
                Be the first to get the latest news, promotions, and much more
              </p>
              <form id="newsletter-form" onSubmit={submitHandler}>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="contact-main-2"
                />
                <Button type="submit">JOIN NOW</Button>
              </form>
            </div>
            <div className="footer-support2">
              <div className="footer-support3">
                <div className="footer-logo1">
                  <Link to="/">
                    <img src="/web_logo_name.png" alt="logo" width={100} />
                  </Link>
                </div>

                <p>The best online nail Accessories store in Nigeria</p>
              </div>
              <div className="footer-support3">
                <h5>CONTACT INFO</h5>
                <h6>Address: </h6>
                <p>Central Business District, Abuja, Nigeria 900211</p>
                <h6>Email: </h6>
                <p>info@nailsrepublic.com</p>
                <h6>Phone: </h6>
                <p>+234 906 310 6069</p>
              </div>
              <div className="footer-support3">
                <h5>QUICK LINKS</h5>
                <Link to="/about">
                  <h6>About</h6>
                </Link>
                <Link to="/contact">
                  <h6>Contact Us</h6>
                </Link>
                <Link to="/">
                  <h6>Privacy Policy</h6>
                </Link>
                <Link to="/">
                  <h6>Terms & Condition</h6>
                </Link>
                <Link to="/">
                  <h6>Return Policy</h6>
                </Link>
              </div>
              <div className="footer-support3">
                <h5>MY ACCOUNT</h5>
                <Link to="/signin">
                  <h6>Sign in</h6>
                </Link>
                <Link to="/profile">
                  <h6>Profile</h6>
                </Link>
                <Link to="/orderhistory">
                  <h6>Order History</h6>
                </Link>
              </div>
            </div>

            <div className="below-footer">
              <div>© 2022 - NAILS REPUBLIC™</div>

              <div className="icons">
                <a href="/">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="/">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a
                  href="https://www.instagram.com/nailsrepublic_/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>

              <div className="d-flex icons">
                <i className="fab fa-cc-paypal" />
                <i className="fab fa-cc-mastercard" />
                <i className="fab fa-cc-visa" />
                <i className="fab fa-cc-stripe" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
