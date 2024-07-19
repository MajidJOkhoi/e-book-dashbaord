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
