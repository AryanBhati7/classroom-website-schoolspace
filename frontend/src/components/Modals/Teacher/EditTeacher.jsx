import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacher } from "../../../features/dataSlice";
import { useUpdateTeacher } from "../../../hooks/teacher.hook";
import LoadingSpinner from "../../LoadingSpinner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  classroom: z.string().min(1, "Classroom is required"),
});

function EditTeacher({ teacher, onClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: teacher.name,
      email: teacher.email,
      classroom: teacher.classroom._id,
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: updateTeacherApiCall, isPending } = useUpdateTeacher();

  const onSubmit = async (data) => {
    const res = await updateTeacherApiCall({ ...data, _id: teacher._id });

    if (res) {
      dispatch(updateTeacher({ name: res.name, _id: res._id }));
      onClose();
    }
  };

  const classrooms = useSelector((state) => state.data.classrooms);

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Edit Teacher</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="classroom"
            >
              Assigned Classroom
            </label>
            <select
              id="classroom"
              {...register("classroom")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 hover:border-blue-500"
            >
              <option value="">Select a classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTeacher;
