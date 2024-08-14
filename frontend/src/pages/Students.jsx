import React, { useState } from "react";
import {
  LoadingSpinner,
  EditStudent,
  AddStudent,
  DeleteStudent,
} from "../components/index.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useStudents } from "../hooks/student.hook.js";

function Students() {
  const { data: students, isPending } = useStudents();
  console.log(students);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  if (isPending) {
    return <LoadingSpinner />;
  }
  console.log(students);

  return (
    <div className="flex-1 p-8 bg-white shadow-lg rounded-lg m-3 flex flex-col h-[96%]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">STUDENTS</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <span className="mr-2">+</span> Add a new Student
        </button>
      </div>
      {isAddModalOpen && (
        <AddStudent onClose={() => setIsAddModalOpen(false)} />
      )}
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
              <th scope="col" className="px-6 py-3">
                Assigned Teacher
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
                  <td className="px-6 py-4">
                    {item.teacher?.name ? item.teacher?.name : "N/A"}
                  </td>
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
        <EditStudent student={selectedStudent} onClose={handleCloseEditModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteStudent
          student={selectedStudent}
          onClose={handleCloseDeleteModal}
        />
      )}
    </div>
  );
}

export default Students;
