import axios from "axios";
import { attachResponseInterceptor } from "./response-interceptor";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = "https://localhost:7115/api/";
export const cms_base_api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach middleware interceptors
// We don't use bearer, we're using cookies for authentication
// attachRequestInterceptor(itwApi);
attachResponseInterceptor(cms_base_api);
