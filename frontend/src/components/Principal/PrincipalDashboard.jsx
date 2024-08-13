import React from "react";
import { usePrincipalDashboard } from "../../hooks/dashboard.hook";
import LoadingSpinner from "../LoadingSpinner";

function PrincipalDashboard() {
  const { data: dashboardData, isPending } = usePrincipalDashboard();

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full text-sm text-center text-gray-500">
        <thead className="text-md uppercase bg-blue-500 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Classroom Name
            </th>
            <th scope="col" className="px-6 py-3">
              Number of Students
            </th>
            <th scope="col" className="px-6 py-3">
              Assigned Teacher
            </th>
            <th scope="col" className="px-6 py-3">
              TimeTable Status
            </th>
          </tr>
        </thead>
        <tbody>
          {dashboardData ? (
            dashboardData.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">{item.sr}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.classroomName}
                </td>
                <td className="px-6 py-4">{item.noOfStudents}</td>
                <td className="px-6 py-4">{item.assignedTeacher}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      item.timeTableStatus ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b">
              <td colSpan="5" className="px-6 py-4 text-center">
                Create a classroom to view the dashboard
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PrincipalDashboard;
