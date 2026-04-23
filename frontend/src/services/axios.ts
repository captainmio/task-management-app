import { default as axios } from "axios";
import { showNotification } from "../components/showNotification";
import { useAuthStore } from "../store/auth.store";

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response && (error.response.status === 401)) {

      const { data } = await api.post('refresh-token')
      try {
          api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`
          return api(originalRequest)
      } catch (err) {
          useAuthStore.getState().clearToken();
          useAuthStore.getState().setToken(data.accessToken);

          return Promise.reject(err)
      }

    } else if (error.response && (error.response.status === 400)) {
            // Logic for 400 errors (e.g., alert the user or log the error)
      const message = error.response.data.message || "Invalid request";
      showNotification("error", message); // Example using a notification library
    }
    return Promise.reject(error);
  }
);


export default api