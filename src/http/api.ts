import axios from 'axios';
import useTokenStore from '@/store';

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
});

// Centralized error handler
const handleError = (error) => {
  if (error.response) {
    console.error("Response error: ", error.response.data);
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    console.error("Request error: ", error.request);
    throw new Error("Network error, please try again later");
  } else {
    console.error("Error: ", error.message);
    throw new Error(error.message);
  }
};

// Interceptor to attach token
api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, handleError);

// API functions
export const login = async (data: { email: string; password: string }) => {
  return await api.post("/api/users/login", data);
};

export const register = async (data: { name: string; email: string; password: string }) => {
  return await api.post("/api/users/register", data);
};

export const getBooks = async () => {
  return await api.get("/api/book/books");
};

export const getBookById = async (id: string) => {
  try {
    const response = await api.get(`/api/book/books/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createBook = async (data: FormData) => {
  return await api.post("/api/book/createbook", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },  
  });  
};  

export const editBook = async (id: string, data: FormData) => {
  try {
    const response = await api.put(`/api/book/books/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await api.delete(`/api/book/books/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
