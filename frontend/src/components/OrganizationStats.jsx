import React from "react";
import { useOrganizationStats } from "../hooks/dashboard.hook";
import { LoaderIcon } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";
import Schedule from "./Schedule";

function OrganizationStats({}) {
  const { data: organization, isPending } = useOrganizationStats();
  const role = useSelector((state) => state.auth.user.role);
  if (isPending) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-[28%]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {organization.organization}
      </h1>
      <div className="space-y-4">
        {role === "TEACHER" || role === "STUDENT" ? (
          <>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Class Name:</span>{" "}
              {organization.className}
            </p>
          </>
        ) : null}
        {role === "PRINCIPAL" && (
          <>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Number of Classrooms:</span>{" "}
              {organization.numberOfClassrooms}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Number of Teachers:</span>{" "}
              {organization.numberOfTeachers}
            </p>
          </>
        )}
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Number of Students:</span>{" "}
          {organization.numberOfStudents}
        </p>
        {role === "TEACHER" || role === "STUDENT" ? (
          <>
            {organization.classSchedule && (
              <ul className="space-y-2">
                {organization.classSchedule.map((item, index) => (
                  <Schedule key={index} item={item} index={index} />
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default OrganizationStats;
