// frontend/src/features/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    classrooms: [],
    teachers: [],
  },
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    updateTeacher: (state, action) => {
      const index = state.teachers.findIndex(
        (teacher) => teacher._id === action.payload._id
      );
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    },
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload
      );
    },
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    setClassrooms: (state, action) => {
      state.classrooms = action.payload;
    },
    updateClassroom: (state, action) => {
      const index = state.classrooms.findIndex(
        (classroom) => classroom._id === action.payload._id
      );
      if (index !== -1) {
        state.classrooms[index] = action.payload;
      }
    },
    deleteClassroom: (state, action) => {
      state.classrooms = state.classrooms.filter(
        (classroom) => classroom._id !== action.payload
      );
    },
    addClassroom: (state, action) => {
      state.classrooms.push(action.payload);
    },
  },
});

export const {
  setTeachers,
  updateTeacher,
  deleteTeacher,
  setClassrooms,
  updateClassroom,
  deleteClassroom,
  addClassroom,
  addTeacher,
} = dataSlice.actions;

export default dataSlice.reducer;
