import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import logger from 'use-reducer-logger';
import {
  Tools,
  LoadingBox,
  MessageBox,
  MaylikeProducts,
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
        searchedTools: action.payload.tools,
        page: action.payload.page,
        pages: action.payload.pages,
        countTools: action.payload.countTools,
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

export default function ToolsProductScreen() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || '';
  const page = sp.get('page') || 1;

  const [
    { loadingSearchPage, searchPageError, pages, searchedTools },
    dispatch,
  ] = useReducer(logger(reducer), {
    loadingSearchPage: true,
    searchPageError: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/tools/changepage?page=${page}&query=${query}`
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
      skipPathname ? '' : '/tools/changepage?'
    }&query=${filterQuery}&page=${filterPage}`;
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/tools/categories`);
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
        <title>All Nail Art tools Products - nailsrepublic</title>
      </Helmet>
      <div className="fixed-container"></div>
      <Container>
        <Link to="/tools">
          <h2 className="mt-5">
            <i className="fab fa-gitter"> </i> Exquisite Nail Tool
          </h2>
        </Link>
        <div className="products">
          {loadingSearchPage ? (
            <LoadingBox />
          ) : searchPageError ? (
            <MessageBox variant="danger">{searchPageError}</MessageBox>
          ) : (
            <>
              {searchedTools?.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {searchedTools?.map((product) => (
                  <Col
                    key={product.slug}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-3 featured-cards"
                  >
                    <Tools tool={product}></Tools>
                  </Col>
                ))}
                <div className="mt-4">
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={{
                        pathname: '/tools/changepage',
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
