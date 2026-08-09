//axios instance to be used by the whole application

import axios from "axios";
import { env } from "./env";
import { getAccessToken } from "./auth";

export const api = axios.create({
  baseURL: env.API_URL, //application base url.Your backend URL (e.g., https://api.yourhospital.com)
  timeout: env.REQUEST_TIMEOUT, //application timeout for requests.How long to wait before timeout
  headers: {
    "Content-Type": "application/json",
  },
});

//request interceptors- Adds JWT token to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken(); // Gets the stored JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adds to header
  }
  return config;
});

//response interceptors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);
// Notice how every API request now automatically includes the JWT once authentication is in place.
