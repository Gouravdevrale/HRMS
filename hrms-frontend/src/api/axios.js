import axios from "axios";

const api = axios.create({
// <<<<<<< HEAD
  // baseURL: "http://localhost:5000/api",
  // baseURL: import.meta.env.VITE_API_URL,
// =======
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://hrms-backend-fj85.onrender.com/api",
// >>>>>>> fe786fc2be9a1c0af116f52cc982abb31575e2a0
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default api;
