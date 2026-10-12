import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "An API error occurred";
    return Promise.reject(new Error(message));
  }
);

