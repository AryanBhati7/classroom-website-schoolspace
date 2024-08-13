import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants.js";
console.log(BASE_URL);
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// API.interceptors.response.use(
//   (response) => response, // For successful requests, just return the response
//   async (error) => {
//     console.log("error occured", error);
//     const originalRequest = error.config;
//     // Check if the error is due to an expired JWT and we haven't already retried the request
//     if (
//       error?.response?.data?.error === "jwt expired" &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true; // Mark this request as retried
//       try {
//         console.log("this refresh access token called");
//         const { accessToken } = await refreshAccessToken();
//         console.log("new access token", accessToken);
//         // Assume this function refreshes the token and returns the new one
//         // Update the authorization header with the new token
//         API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return API(originalRequest); // Retry the original request with the new token
//       } catch (refreshError) {
//         // If the token refresh fails, reject the promise
//         return Promise.reject(refreshError);
//       }
//     }
//     // For all other errors, just return the promise rejection
//     return Promise.reject(error);
//   }
// );

export const login = async (formData) => {
  try {
    const { data } = await API.post("/auth/login", formData);
    toast.success(data?.message);
    return data?.data?.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const logout = async () => {
  console.log("logout called");
  try {
    const { data } = await API.post("/auth/logout");
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/auth/current-user");
    return data?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const registerUser = async (formData) => {
  try {
    const { data } = await API.post("/auth/register", formData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const changePassword = async (newPassData) => {
  try {
    const { data } = await API.post("/users/change-password", newPassData);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

// export const refreshAccessToken = async () => {
//   console.log("refresh access token called");
//   try {
//     const { data } = await API.post("/auth/refresh-token");
//     console.log(data);
//     return data?.data;
//   } catch (error) {
//     throw error?.response?.data?.error;
//   }
// };
