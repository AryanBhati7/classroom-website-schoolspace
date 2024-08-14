import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../api/student.api";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: () => getAllStudents(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (student) => addStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (student) => updateStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studentId) => deleteStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });
};
