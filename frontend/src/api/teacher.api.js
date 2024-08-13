import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants.js";
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllTeachers = async () => {
  try {
    const { data } = await API.get("/teacher");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const addTeacher = async (teacher) => {
  try {
    const { data } = await API.post("/teacher", teacher);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateTeacher = async (teacher) => {
  try {
    const { data } = await API.put(`/teacher/${teacher._id}`, teacher);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const deleteTeacher = async (teacherId) => {
  try {
    const { data } = await API.delete(`/teacher/${teacherId}`);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
