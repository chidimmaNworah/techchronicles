import React, { useContext, useReducer, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError, API_URL } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
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

export default function ApplicationForm() {
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ error, loadingUpdate, loadingUpload }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );

  const [resume, setResume] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [adressCity, setAdressCity] = useState('');
  const [addressPostalCode, setAddressPostalCode] = useState('');
  const [addressCountry, setAddressCountry] = useState('');
  const [addressState, setAddressState] = useState('');
  const [howdidyouhearaboutus, setHowdidyouhearaboutus] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');
  const [availability, setAvailability] = useState('');
  const [shortNote, setShortNote] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.post(
        `${API_URL}/api/forms/job`,
        {
          resume,
          firstName,
          lastName,
          middleName,
          email,
          countryCode,
          phone,
          position,
          addressStreet,
          adressCity,
          addressPostalCode,
          addressCountry,
          addressState,
          howdidyouhearaboutus,
          desiredSalary,
          availability,
          shortNote,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Application Submitted Successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

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

      setResume(data.secure_url); // Update the resume state directly with the URL

      toast.success('Resume Updated Successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <Container className="small-container">
      {userInfo ? (
        <div>
          <h1 className="py-5">Fill The Form To Apply</h1>

          {error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Form onSubmit={submitHandler}>
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Resume</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => uploadFileHandler(e, true)}
                  />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>
                {resume ? (
                  <Form.Group className="mb-3" controlId="resume">
                    <Form.Label>Resume Name</Form.Label>
                    <Form.Control
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                      disabled
                      required
                    />
                  </Form.Group>
                ) : null}
              </div>
              <Row lg={3} md={3} sm={12} xs={1}>
                <Col>
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="middleName">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      onChange={(e) => setMiddleName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row lg={2} md={2} sm={2} xs={1}>
                <Col>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Phone</Form.Label>
                  <div className="d-flex flex-row justify-content-start align-items-center">
                    <Form.Group
                      className="mb-3 rounded-none"
                      controlId="countryCode"
                    >
                      <Form.Select
                        aria-label="Country Code"
                        onChange={(e) => setCountryCode(e.target.value)}
                        required
                      >
                        <option>+000</option>
                        <option value="+234">+234</option>
                        <option value="+229">+229</option>
                        <option value="+233">+233</option>
                        <option value="+228">+228</option>
                        <option value="+254">+254</option>
                        <option value="+265">+265</option>
                        <option value="+258">+258</option>
                        <option value="+256">+256</option>
                        <option value="+250">+250</option>
                        <option value="+255">+255</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Control
                        as="input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Select
                  aria-label="Position"
                  onChange={(e) => setPosition(e.target.value)}
                  required
                >
                  <option>Select Position</option>
                  <option value="Creative Copy Writer">
                    Creative Copy Writer
                  </option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Digital Marketer">Digital Marketer</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="addressStreet">
                <Form.Label>Address Street</Form.Label>
                <Form.Control
                  onChange={(e) => setAddressStreet(e.target.value)}
                  required
                />
              </Form.Group>
              <Row lg={2} md={2} sm={2} xs={1}>
                <Col>
                  <Form.Group className="mb-3" controlId="adressCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={(e) => setAdressCity(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="addressPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      onChange={(e) => setAddressPostalCode(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row lg={2} md={2} sm={2} xs={1}>
                <Col>
                  <Form.Group className="mb-3" controlId="addressCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      onChange={(e) => setAddressCountry(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="addressState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      onChange={(e) => setAddressState(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="howdidyouhearaboutus">
                <Form.Label>How Did You Hear About Us</Form.Label>
                <Form.Select
                  aria-label="Position"
                  onChange={(e) => setHowdidyouhearaboutus(e.target.value)}
                  required
                >
                  <option>Make a Selection</option>
                  <option value="Job Board">Job Board</option>
                  <option value="Conference">Conference</option>
                  <option value="Linkedin">Linkedin</option>
                  <option value="Recruiter Source">Recruiter Source</option>
                  <option value="Referred By Current Employee">
                    Referred By Current Employee
                  </option>
                  <option value="Friend or Family">Friend or Family</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="desiredSalary">
                <Form.Label>Desired Salary</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={(e) => setDesiredSalary(e.target.value)}
                    required
                  />
                  <InputGroup.Text>/month</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="availability">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  aria-label="Position"
                  onChange={(e) => setAvailability(e.target.value)}
                  required
                >
                  <option>Make a Selection</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Within 2 week">Within 2 week</option>
                  <option value="Within 3 week">Within 3 week</option>
                  <option value="Within 4 week">Within 4 week</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="shortNote">
                <Form.Label>
                  Tell us a little about yourself and why you should be hired
                </Form.Label>
                <textarea
                  onChange={(e) => setShortNote(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="mb-3">
                <Button disabled={loadingUpdate} type="submit">
                  Submit
                </Button>
                {loadingUpdate && <LoadingBox></LoadingBox>}
              </div>
            </Form>
          )}
        </div>
      ) : (
        <MessageBox className="my-5">
          Please{' '}
          <Link to="/signin?redirect=/careers/job-application-portal/copywriter">
            Sign In
          </Link>{' '}
          to apply
        </MessageBox>
      )}
    </Container>
  );
}
