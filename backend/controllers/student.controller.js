import { Classroom } from "../models/classroom.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, password, classroomId } = req.body;

  if (!name) {
    throw new ApiError(400, "Please provide a name for the student");
  }

  if (!email) {
    throw new ApiError(400, "Please provide an email for the student");
  }

  if (!password) {
    throw new ApiError(400, "Please provide a password for the student");
  }

  if (!classroomId) {
    throw new ApiError(400, "Please provide a classroom id for the student");
  }

  const classroom = await Classroom.findById(classroomId);

  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }
  const existStudent = await User.findOne({ email });

  if (existStudent) {
    throw new ApiError(400, "Student already exists");
  }

  const student = new User({
    name,
    email,
    password,
    role: "STUDENT",
  });

  await student.save();

  const createdStudent = await User.findById(student._id).select("-password");

  classroom.students.push(createdStudent._id);

  await classroom.save();

  return res
    .status(201)
    .json(new ApiResponse(201, createdStudent, "Student created"));
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.aggregate([
    { $match: { role: "STUDENT" } }, // Match only students
    {
      $lookup: {
        from: "classrooms", // Collection to join with
        localField: "_id", // Field from the input documents (student _id)
        foreignField: "students", // Field from the classrooms collection
        as: "classroom", // Output array field
      },
    },
    {
      $unwind: {
        path: "$classroom",
        preserveNullAndEmptyArrays: true, // Preserve students without classrooms
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        role: 1,
        classroom: "$classroom.name", // Project the classroom name
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        students,
        "All students' classrooms fetched successfully"
      )
    );
});

const updateStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const { name, email, password } = req.body;

  if (!studentId) {
    throw new ApiError(400, "Please provide a student id");
  }

  const student = await User.findById(studentId);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  if (name) {
    student.name = name;
  }

  if (email) {
    student.email = email;
  }

  if (password) {
    student.password = password;
  }

  await student.save();

  const updatedStudent = await User.findById(studentId).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedStudent, "Student updated"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  if (!studentId) {
    throw new ApiError(400, "Please provide a student id");
  }

  const student = await User.findById(studentId);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }
  // Remove the student from the classroom's students array
  const classroom = await Classroom.findOne({ students: studentId });
  if (classroom) {
    classroom.students.pull(studentId);
    await classroom.save();
  }

  await User.findByIdAndDelete(studentId);

  return res.status(200).json(new ApiResponse(200, {}, "Student deleted"));
});

const getStudentById = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  if (!studentId) {
    throw new ApiError(400, "Please provide a student id");
  }

  const student = await User.findById(studentId);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return res.status(200).json(new ApiResponse(200, student, "Student found"));
});

export {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
};
