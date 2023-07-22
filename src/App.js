import { BrowserRouter, Link, Route, Routes, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store.js';
import {
  HomeScreen,
  MapScreen,
  UserEditScreen,
  UserListScreen,
  OrderListScreen,
  BlogEditScreen,
  BlogListScreen,
  DashboardScreen,
  SearchScreen,
  BlogPostScreen,
  ProfileScreen,
  OrderScreen,
  SigninScreen,
  SignupScreen,
  ContactScreen,
  AboutScreen,
  VerifyEmailScreen,
  ChangePassScreen,
  ForgotPassScreen,
  PrivacyPolicyScreen,
  SuperAdminScreen,
  TermsAndConditionsScreen,
} from './screens';
import { SearchBox, ProtectedRoute, AdminRoute } from './components';
import { getError, API_URL } from './utils.js';
import axios from 'axios';
import ScrollToTop from './components/ScrollToTop.js';
import BackToTopButton from './components/BactToTopButton.js';
import Footer from './components/Footer.js';
import moment from 'moment';
import SuperAdminEditScreen from './screens/SuperAdminEditScreen.js';
import Advertise from './screens/AdvertiseScreen.js';
axios.defaults.withCredentials = true;

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [categories, setCategories] = useState([]);

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

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? '#1e2024' : '#ffffff',
      background: isActive ? '#17a2b8' : '',
    };
  };

  const handleLinkSelect = () => {
    // Close the navbar programmatically
    const navToggle = document.getElementById('responsive-navbar-nav');
    if (navToggle) {
      navToggle.classList.remove('show');
    }
  };

  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />

        <header>
          <ScrollToTop />
          <Navbar
            collapseOnSelect
            className="navbar bg-dark navbar-dark py-2 py-lg-0 px-lg-5"
            expand="lg"
          >
            <a href="/" className="navbar-brand d-block">
              <h1 className="m-0 display-6 text-uppercase primary-color">
                Kimmo
                <span className="text-white font-weight-normal">Blog</span>
              </h1>
            </a>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              bg="dark"
              variant="dark"
              className="navbar-toggler"
              toogle="collapse"
            />
            <Navbar.Collapse id="responsive-navbar-nav w-full d-flex justify-content-end">
              <Nav className="me-auto w-100" onSelect={handleLinkSelect}>
                <div className="navbar-nav mr-auto py-0 w-100 d-flex justify-content-end">
                  <NavLink
                    to="/"
                    className="nav-item nav-link"
                    style={navLinkStyles}
                    as={Link}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/search"
                    className="nav-item nav-link"
                    style={navLinkStyles}
                    as={Link}
                  >
                    Articles
                  </NavLink>
                  <NavDropdown title="Category" id="basic-nav-dropdown">
                    <Nav.Item className="dropdown-item">
                      <LinkContainer to="/search">
                        <NavDropdown.Item>All</NavDropdown.Item>
                      </LinkContainer>
                    </Nav.Item>
                    {categories.map((category) => (
                      <Nav.Item key={category} className="dropdown-item">
                        <LinkContainer
                          to={{
                            pathname: '/search',
                            search: `category=${category}`,
                          }}
                        >
                          <NavDropdown.Item>{category}</NavDropdown.Item>
                        </LinkContainer>
                      </Nav.Item>
                    ))}
                  </NavDropdown>

                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item eventkey="4" as={Link}>
                          User Profile
                        </NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Divider />
                      <a
                        eventkey="6"
                        as={Link}
                        className="dropdown-item"
                        href="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </a>
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
                      {userInfo.email === 'nailsrepublicofficial@gmail.com' ? (
                        <LinkContainer to="/admin/super-admin">
                          <NavDropdown.Item>All Blogs</NavDropdown.Item>
                        </LinkContainer>
                      ) : (
                        ''
                      )}
                      <LinkContainer to="/admin/blogs">
                        <NavDropdown.Item>Blogs</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  ) : (
                    ''
                  )}
                </div>
              </Nav>
              <SearchBox />
            </Navbar.Collapse>
          </Navbar>
        </header>
        <div>
          <div className="container-fluid d-none d-lg-block">
            <div className="row align-items-center bg-dark px-lg-5">
              <div className="col-lg-9">
                <nav className="navbar navbar-expand-sm bg-dark p-0">
                  <ul className="navbar-nav ml-n2">
                    <li className="nav-item border-right border-secondary">
                      <a className="nav-link text-body small" href="/">
                        {/* Monday, January 1, 2045 */}
                        {moment().format('dddd, MMMM DD, YYYY')}
                      </a>
                    </li>
                    <li className="nav-item border-right border-secondary">
                      <a
                        className="nav-link text-body small"
                        href="/advertise-with-us"
                      >
                        Advertise
                      </a>
                    </li>
                    <li className="nav-item border-right border-secondary">
                      <a className="nav-link text-body small" href="/contact">
                        Contact
                      </a>
                    </li>
                    <li className="nav-item border-right border-secondary">
                      <a className="nav-link text-body small" href="/about">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-body small" href="/signin">
                        Login
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div className="">
            <Routes>
              {/* <ScrollRestoration /> */}
              <Route path="/article/:slug" element={<BlogPostScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/our-privacy-policy"
                element={<PrivacyPolicyScreen />}
              />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditionsScreen />}
              />
              <Route path="/admin/super-admin" element={<SuperAdminScreen />} />
              <Route
                path="/admin/super-admin/:id"
                element={<SuperAdminEditScreen />}
              />
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

              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/advertise-with-us" element={<Advertise />} />

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
                path="/admin/blogs"
                element={
                  <AdminRoute>
                    <BlogListScreen />
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
                path="/admin/blog/:id"
                element={
                  <AdminRoute>
                    <BlogEditScreen />
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

              <Route path="/changepage" element={<HomeScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
        <footer>
          <Footer />
          <div
            className="container-fluid py-4 px-sm-3 px-md-5"
            style={{ background: '#111111' }}
          >
            <p className="m-0 text-center text-white">
              &copy; <a href="/">Kimmotech Blog</a>. All Rights Reserved. Design
              by <a href="https://www.kimmotechnology.com">kimmotechnology</a>
            </p>
          </div>
          <BackToTopButton />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
