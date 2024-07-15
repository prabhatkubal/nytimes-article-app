import axios from 'axios';

const apiKey = process.env.REACT_APP_NYTIMES_API_KEY;
const baseUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed';

const instance = axios.create({
  baseURL: baseUrl,
  params: {
    'api-key': apiKey
  }
});

export default instance;
