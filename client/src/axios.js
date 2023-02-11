import axios from "axios";

export const makeRequest = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api/"
      : "http://localhost:8800/api/",
  withCredentials: true,
});
