import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants.js";
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllClassrooms = async () => {
  try {
    const { data } = await API.get("/classroom");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const addClassroom = async (classroom) => {
  try {
    const { data } = await API.post("/classroom", classroom);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateClassroom = async (classroom) => {
  try {
    const { data } = await API.patch(`/classroom/${classroom._id}`, classroom);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const deleteClassroom = async (classroomId) => {
  try {
    const { data } = await API.delete(`/classroom/${classroomId}`);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
