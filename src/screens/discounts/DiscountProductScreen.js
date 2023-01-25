import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import logger from 'use-reducer-logger';
import {
  Discount,
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
        searchedDiscounts: action.payload.discounts,
        page: action.payload.page,
        pages: action.payload.pages,
        countDiscounts: action.payload.countDiscounts,
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

export default function DiscountProductScreen() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || '';
  const page = sp.get('page') || 1;

  const [
    { loadingSearchPage, searchPageError, pages, searchedDiscounts },
    dispatch,
  ] = useReducer(logger(reducer), {
    loadingSearchPage: true,
    searchPageError: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/discounts/changepage?page=${page}&query=${query}`
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
      skipPathname ? '' : '/discounts/changepage?'
    }&query=${filterQuery}&page=${filterPage}`;
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/discounts/categories`);
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
        <title>All Discount Products - nailsrepublic</title>
      </Helmet>
      <Container>
        <Link to="/discounts">
          <h2 className="mt-4">
            <i className="fab fa-gitter"> </i> Save up to 40%
          </h2>
        </Link>
        <div className="products">
          {loadingSearchPage ? (
            <LoadingBox />
          ) : searchPageError ? (
            <MessageBox variant="danger">{searchPageError}</MessageBox>
          ) : (
            <>
              {searchedDiscounts?.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {searchedDiscounts?.map((product) => (
                  <Col
                    key={product.slug}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-3 featured-cards"
                  >
                    <Discount discount={product}></Discount>
                  </Col>
                ))}
                <div className="mt-4">
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={{
                        pathname: '/discounts/changepage',
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

        <div>
          <h4 className="categ-main mt-4">Categories</h4>
          <div className="categ">
            {categories.map((category) => (
              <Link
                to={{ pathname: '/search', search: `category=${category}` }}
                key={category}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <MaylikeProducts />
      </Container>
    </>
  );
}
