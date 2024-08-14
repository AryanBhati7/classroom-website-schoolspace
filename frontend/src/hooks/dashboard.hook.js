import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrincipalDashboard,
  getOrganizationStats,
  getTeachersAndClassrooms,
} from "../api/dashboard.api";

export const usePrincipalDashboard = () => {
  return useQuery({
    queryKey: ["principalDashboard"],
    queryFn: () => getPrincipalDashboard(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useOrganizationStats = () => {
  return useQuery({
    queryKey: ["organizationStats"],
    queryFn: () => getOrganizationStats(),
    retry: 1,
  });
};

export const useTeachersAndClassrooms = () => {
  return useQuery({
    queryKey: ["teachersAndClassrooms"],
    queryFn: () => getTeachersAndClassrooms(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
