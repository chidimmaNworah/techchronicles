import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import logger from 'use-reducer-logger';
import {
  Combo,
  LoadingBox,
  MaylikeProducts,
  MessageBox,
} from '../../components';
import { getError, API_URL } from '../../utils';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_PAGE_REQUEST':
      return { ...state, loadingSearchPage: true };
    case 'SEARCH_PAGE_SUCCESS':
      return {
        ...state,
        searchedCombos: action.payload.combos,
        page: action.payload.page,
        pages: action.payload.pages,
        countCombos: action.payload.countCombos,
        loadingSearchPage: false,
      };
    case 'SEARCH_PAGE_FAIL':
      return {
        ...state,
        loadingSearchPage: false,
        searchPageError: action.payload,
      };

    default:
      return state;
  }
};

export default function ComboProductScreen() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || '';
  const page = sp.get('page') || 1;

  const [
    { loadingSearchPage, searchPageError, pages, searchedCombos },
    dispatch,
  ] = useReducer(logger(reducer), {
    loadingSearchPage: true,
    searchPageError: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/combos/changepage?page=${page}&query=${query}`
        );
        dispatch({ type: 'SEARCH_PAGE_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'SEARCH_PAGE_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [page, searchPageError, query]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;
    return `${
      skipPathname ? '' : '/combos/changepage?'
    }&query=${filterQuery}&page=${filterPage}`;
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/combos/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Combo Products - nailsrepublic</title>
      </Helmet>
      <div className="fixed-container"></div>
      <Container>
        {categories.map((category) => (
          <div className="d-flex justify-content-around py-4" key={category}>
            <Link to={{ pathname: '/search', search: `category=${category}` }}>
              <p>{category}</p>
            </Link>
          </div>
        ))}
        <Link to="/combos">
          <h2 className="">
            <i className="fab fa-gitter"> </i> Shop Hot Combo Products
          </h2>
        </Link>
        <div className="products">
          {loadingSearchPage ? (
            <LoadingBox />
          ) : searchPageError ? (
            <MessageBox variant="danger">{searchPageError}</MessageBox>
          ) : (
            <>
              {searchedCombos?.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {searchedCombos?.map((product) => (
                  <Col
                    key={product.slug}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-3 featured-cards"
                  >
                    <Combo combo={product}></Combo>
                  </Col>
                ))}
                <div className="mt-4">
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={{
                        pathname: '/combos/changepage',
                        search: getFilterUrl({ page: x + 1 }, true),
                      }}
                    >
                      <Button
                        className={Number(page) === x + 1 ? 'text-bold' : ''}
                        variant="light"
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </Row>
            </>
          )}
        </div>

        <MaylikeProducts />
      </Container>
    </>
  );
}
