import React, { useState } from "react";
import { LoadingSpinner } from "../index.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useStudents } from "../../hooks/student.hook.js";

function StudentDashboard() {
  const { data: students, isPending } = useStudents();
  console.log(students);

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 p-2 m-2 bg-white rounded-lg flex flex-col h-[96%]">
      <div className="relative overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-center text-gray-500">
          <thead className="text-md uppercase bg-blue-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="text-lg text-gray-900">
            {students.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan="5" className="px-6 py-4 text-center">
                  No Students found
                </td>
              </tr>
            ) : (
              students.map((item, index) => (
                <tr key={item._id} className="bg-white border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentDashboard;
