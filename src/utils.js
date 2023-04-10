export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

// export const API_URL = 'http://localhost:5111';

export const API_URL = 'https://techchroniclesbackend.herokuapp.com';

// 'Dont talk to me like that'
