import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/efiling",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const storedAuth = JSON.parse(localStorage.getItem("auth"));

  const token = storedAuth?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;