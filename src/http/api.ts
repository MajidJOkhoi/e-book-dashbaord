import axios from "axios";

const api = axios.create({
  // move this
  baseURL: "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
});


export const login = async (data: { email: string; password: string }) =>
  await api.post("/api/users/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => await api.post("/api/users/register", data);

export const getBooks = async () => {
  return await api.get("/api/book/books");
};
