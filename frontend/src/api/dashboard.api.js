import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants.js";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getPrincipalDashboard = async () => {
  try {
    const { data } = await API.get("/dashboard/principal");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getOrganizationStats = async () => {
  try {
    const { data } = await API.get("/dashboard/organization-stats");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getTeachersAndClassrooms = async () => {
  try {
    const { data } = await API.get("/dashboard/classrooms-teachers");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
