import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/teacher.api";

export const useTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useAddTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacher) => addTeacher(teacher),
    onSuccess: () => {
      queryClient.invalidateQueries("teachers");
    },
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacher) => updateTeacher(teacher),
    onSuccess: () => {
      queryClient.invalidateQueries("teachers");
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacherId) => deleteTeacher(teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries("teachers");
    },
  });
};
