import React, { useState } from "react";

import {
  LoadingSpinner,
  EditClassroom,
  AddClassroom,
  DeleteClassroom,
} from "../components/index.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useClassrooms } from "../hooks/classroom.hook.js";

function Classrooms() {
  const { data: classrooms, isPending } = useClassrooms();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const handleEditClick = (teacher) => {
    setSelectedClassroom(teacher);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClassroom(null);
  };

  const handleDeleteClick = (teacher) => {
    setSelectedClassroom(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedClassroom(null);
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 p-8 bg-white shadow-lg rounded-lg m-3 flex flex-col h-[96%]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">CLASSROOMS</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded flex items-center"
        >
          <span className="mr-2">+</span> Create a new Classroom
        </button>
      </div>
      {isAddModalOpen && (
        <AddClassroom onClose={() => setIsAddModalOpen(false)} />
      )}
      <div className="relative overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-center text-gray-500 overflow-y-scroll">
          <thead className="text-md uppercase bg-blue-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Classroom Name
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned Teacher
              </th>
              <th scope="col" className="px-6 py-3">
                Schedule
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {classrooms.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan="5" className="px-6 py-4 text-center">
                  No Classrooms found. Create one now to get Started
                </td>
              </tr>
            ) : (
              classrooms.map((classroom, index) => (
                <tr key={classroom._id} className="bg-white border-b">
                  <td className="px-6 text-lg py-4 text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-lg  text-gray-900 whitespace-nowrap">
                    {classroom.name}
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-900">
                    {classroom.teacher
                      ? classroom.teacher?.name
                      : "Not Assigned"}
                  </td>
                  <td className="px-6 py-4">
                    {classroom.schedule && classroom.schedule.length > 0 ? (
                      <ul className="space-y-2">
                        {classroom.schedule.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between bg-blue-100 text-blue-900 rounded-lg p-2 shadow-md"
                          >
                            <span className="font-semibold">{item.days}</span>
                            <span className="text-md">
                              {item.startTime} - {item.endTime}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">
                        No schedule available
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="bg-blue-800 hover:bg-blue-400 text-white px-4 py-2 rounded flex items-center"
                        onClick={() => handleEditClick(classroom)}
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded flex items-center"
                        onClick={() => handleDeleteClick(classroom)}
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <EditClassroom
          classroom={selectedClassroom}
          onClose={handleCloseEditModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteClassroom
          classroom={selectedClassroom}
          onClose={handleCloseDeleteModal}
        />
      )}
    </div>
  );
}

export default Classrooms;
