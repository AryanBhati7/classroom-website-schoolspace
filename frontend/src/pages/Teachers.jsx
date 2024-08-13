import React, { useState } from "react";
import { useTeachers } from "../hooks/teacher.hook";
import {
  LoadingSpinner,
  EditTeacher,
  DeleteTeacher,
  AddTeacher,
} from "../components/index.js";
import { FaEdit, FaTrash } from "react-icons/fa";

function Teachers() {
  const { data: teachers, isPending } = useTeachers();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleDeleteClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTeacher(null);
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 p-8 bg-white shadow-lg rounded-lg m-3 flex flex-col h-[96%]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">TEACHERS</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <span className="mr-2">+</span> Add a new Teacher
        </button>
      </div>
      {isAddModalOpen && (
        <AddTeacher onClose={() => setIsAddModalOpen(false)} />
      )}
      <div className="relative overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-center text-gray-500">
          <thead className="text-md uppercase bg-blue-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Teacher Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned Class
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-lg text-gray-900">
            {teachers.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan="5" className="px-6 py-4 text-center">
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((item, index) => (
                <tr key={item._id} className="bg-white border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    {item.classroom ? item.classroom?.name : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="bg-blue-800 hover:bg-blue-400 text-white px-4 py-2 rounded flex items-center"
                        onClick={() => handleEditClick(item)}
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded flex items-center"
                        onClick={() => handleDeleteClick(item)}
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
        <EditTeacher teacher={selectedTeacher} onClose={handleCloseEditModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteTeacher
          teacher={selectedTeacher}
          onClose={handleCloseDeleteModal}
        />
      )}
    </div>
  );
}

export default Teachers;
