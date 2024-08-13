import React from "react";
import { useOrganizationStats } from "../hooks/dashboard.hook";
import { LoaderIcon } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

function OrganizationStats() {
  const { data: organization, isPending } = useOrganizationStats();

  if (isPending) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {organization.organization}
      </h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Number of Classrooms:</span>{" "}
          {organization.numberOfClassrooms}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Number of Teachers:</span>{" "}
          {organization.numberOfTeachers}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Number of Students:</span>{" "}
          {organization.numberOfStudents}
        </p>
      </div>
    </div>
  );
}

export default OrganizationStats;
