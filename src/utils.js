export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const API_URL = 'https://nailsrepublicserver.herokuapp.com';
