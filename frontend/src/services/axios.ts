import { default as axios } from "axios";
import { showNotification } from "../components/ShowNotification";

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      // Logic for 400 errors (e.g., alert the user or log the error)
      const message = error.response.data.message || "Invalid request";
      showNotification("error", message); // Example using a notification library
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});


export default api