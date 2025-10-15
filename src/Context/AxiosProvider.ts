import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { url } from "../Constants/url";

export const publicAPI = axios.create({
  baseURL: url,
});

export const authAPI = axios.create({
  baseURL: url,
});

authAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const stored = localStorage.getItem("TineyDonkeyToken");

    if (stored) {
      try {
        console.error("Token found");
        const token = JSON.parse(stored);
        if (token && config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (err) {
        console.error("Invalid token in localStorage:", err);
      }
    }
    else console.error("Token not found");

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

authAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      console.warn("Unauthorized. Redirecting to AdminLogin...");
      localStorage.removeItem("TineyDonkeyToken");
      window.location.href = "/Admin";
    }
    return Promise.reject(error);
  }
);
