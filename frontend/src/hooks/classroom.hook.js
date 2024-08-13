import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllClassrooms,
  addClassroom,
  updateClassroom,
  deleteClassroom,
} from "../api/classroom.api";

export const useClassrooms = () => {
  return useQuery({
    queryKey: ["classrooms"],
    queryFn: () => getAllClassrooms(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useAddClassroom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classroom) => addClassroom(classroom),
    onSuccess: () => {
      queryClient.invalidateQueries("classrooms");
    },
  });
};

export const useUpdateClassroom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classroom) => updateClassroom(classroom),
    onSuccess: () => {
      queryClient.invalidateQueries("classroooms");
    },
  });
};

export const useDeleteClassroom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classroomId) => deleteClassroom(classroomId),
    onSuccess: () => {
      queryClient.invalidateQueries("classrooms");
    },
  });
};
