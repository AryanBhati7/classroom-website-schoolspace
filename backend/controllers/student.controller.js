import { Classroom } from "../models/classroom.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, password, classroom } = req.body;

  if (!name) {
    throw new ApiError(400, "Please provide a name for the student");
  }

  if (!email) {
    throw new ApiError(400, "Please provide an email for the student");
  }

  if (!password) {
    throw new ApiError(400, "Please provide a password for the student");
  }

  if (!classroom) {
    throw new ApiError(400, "Please provide a classroom id for the student");
  }

  const existStudent = await User.findOne({ email });

  if (existStudent) {
    throw new ApiError(400, "User with this email already Exists");
  }

  const classroomCheck = await Classroom.findById(classroom);

  if (!classroomCheck) {
    throw new ApiError(404, "Classroom not found");
  }

  const student = new User({
    name,
    email,
    password,
    role: "STUDENT",
    organization: req.user.organization,
  });

  await student.save();

  const createdStudent = await User.findById(student._id).select("-password");

  classroomCheck.students.push(createdStudent._id);

  await classroomCheck.save();

  return res
    .status(201)
    .json(new ApiResponse(201, createdStudent, "Student created"));
});

const getAllStudents = asyncHandler(async (req, res) => {
  const userOrganization = req.user.organization;

  const students = await User.aggregate([
    { $match: { role: "STUDENT", organization: userOrganization } }, // Match only students in the same organization
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
      $lookup: {
        from: "users", // Collection to join with (assuming teachers are also in the users collection)
        localField: "classroom.teacher", // Field from the classrooms documents (teacher reference)
        foreignField: "_id", // Field from the users collection
        as: "teacher", // Output array field
      },
    },
    {
      $unwind: {
        path: "$teacher",
        preserveNullAndEmptyArrays: true, // Preserve classrooms without teachers
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        role: 1,
        classroom: 1, // Project the classroom
        teacher: {
          // Project the teacher details
          _id: "$teacher._id",
          name: "$teacher.name",
          email: "$teacher.email",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        students,
        "All students' classrooms and teachers fetched successfully"
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

  if (student.role !== "STUDENT") {
    throw new ApiError(400, "User is not a student");
  }

  if (student.organization.toString() !== req.user.organization.toString()) {
    throw new ApiError(400, "Student does not belong to your organization");
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

  if (student.role !== "STUDENT") {
    throw new ApiError(400, "User is not a student");
  }

  if (student.organization.toString() !== req.user.organization.toString()) {
    throw new ApiError(400, "Student does not belong to your organization");
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
