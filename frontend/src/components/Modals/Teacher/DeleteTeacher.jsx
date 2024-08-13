import React from "react";
import { useDeleteTeacher } from "../../../hooks/teacher.hook";
import LoadingSpinner from "../../LoadingSpinner";
import { useDispatch } from "react-redux";
import { deleteTeacher } from "../../../features/dataSlice";

function DeleteTeacher({ onClose, teacher }) {
  const dispatch = useDispatch();
  const { mutateAsync: deleteTeacher, isPending } = useDeleteTeacher();

  const onDelete = async () => {
    const res = await deleteTeacher(teacher._id);
    if (res) {
      dispatch(deleteTeacher(teacher._id));
      onClose();
    }
  };

  if (isPending) {
    return <LoadingSpinner />;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Are you sure?</h2>
        <p className="mb-4">
          Do you really want to delete this teacher? This process cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTeacher;
