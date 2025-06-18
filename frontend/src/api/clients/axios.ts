import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { getSessionToken, removeSessionToken } from "../../utils/auth";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add Authorization token if present
axiosClient.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔄 Auto-reset session on 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeSessionToken();
      location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
