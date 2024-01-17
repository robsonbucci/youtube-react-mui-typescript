import axios from 'axios';
import { erroInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: 'http://localhost:3333/',
});

// interceptadores - são funções
Api.interceptors.response.use(
  response => responseInterceptor(response),
  error => erroInterceptor(error)
);

export { Api };
