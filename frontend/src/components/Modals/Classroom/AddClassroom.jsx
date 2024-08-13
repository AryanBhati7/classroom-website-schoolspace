import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSpinner } from "../../index.js";
import { useDispatch, useSelector } from "react-redux";
import { addClassroom } from "../../../features/dataSlice.js";
import { useAddClassroom } from "../../../hooks/classroom.hook.js";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  schedule: z
    .array(
      z.object({
        days: z.string().min(1, "Day is required"),
        startTime: z.string().min(1, "Start time is required"),
        endTime: z.string().min(1, "End time is required"),
      })
    )
    .min(1, "At least one schedule is required"),
  teacher: z.string(),
});

function AddClassroom({ onClose }) {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      schedule: [{ days: "", startTime: "", endTime: "" }],
      teacher: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const { mutateAsync: createClassroom, isPending } = useAddClassroom();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await createClassroom(data);
    if (res) {
      dispatch(addClassroom({ _id: res._id, name: res.name }));
      onClose();
    }
  };

  const teachers = useSelector((state) => state.data.teachers);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (errors) {
    console.log(errors);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Add Classroom</h2>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Schedule
            </label>
            {fields.map((item, index) => (
              <div key={item.id} className="mb-2">
                <div className="flex space-x-2">
                  <select
                    {...register(`schedule.${index}.days`)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                  <input
                    type="time"
                    {...register(`schedule.${index}.startTime`)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <input
                    type="time"
                    {...register(`schedule.${index}.endTime`)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {errors.schedule && errors.schedule[index] && (
                  <p className="text-red-500 text-xs italic">
                    {errors.schedule[index].message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ days: "", startTime: "", endTime: "" })}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Schedule
            </button>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="classroom"
            >
              Assign Teacher
            </label>
            <select
              id="teacher"
              {...register("teacher")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            {errors.classroom && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.classroom.message}
              </p>
            )}
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

export default AddClassroom;
