import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants.js";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllStudents = async () => {
  try {
    const { data } = await API.get("/student");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const addStudent = async (student) => {
  try {
    const { data } = await API.post("/student", student);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateStudent = async (student) => {
  try {
    const { data } = await API.patch(`/student/${student._id}`, student);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const { data } = await API.delete(`/student/${studentId}`);
    toast.success(data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
