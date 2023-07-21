import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  // const [isVisible, setIsVisible] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  // const handleSearchButtonClick = () => {
  //   setIsVisible(true);
  // };

  // const handleHideFormClick = () => {
  //   submitHandler();
  //   setIsVisible(false);
  // };

  return (
    <div>
      {/* {!isVisible && (
        <Button
          variant="outline-primary"
          id="button-search"
          onClick={handleSearchButtonClick}
        >
          <i className="fas fa-search search-font"></i>
        </Button>
      )}
      {isVisible && ( */}
      <Form className="d-flex me-auto" onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search..."
            aria-label="Search Products"
            aria-describedby="button-search"
            className=""
          />

          <Button
            variant="outline-primary"
            type="submit"
            id="button-search"
            // onClick={handleHideFormClick}
          >
            <i className="fas fa-search search-font"></i>
          </Button>
        </InputGroup>
      </Form>
      {/* )} */}
    </div>
  );
}
