import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Classroom } from "../models/classroom.model.js";

const createTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, classroom } = req.body;

  if (!name) {
    throw new ApiError(400, "Please provide a name for the teacher");
  }

  if (!email) {
    throw new ApiError(400, "Please provide an email for the teacher");
  }

  if (!password) {
    throw new ApiError(400, "Please provide a password for the teacher");
  }

  if (!classroom) {
    throw new ApiError(400, "Please assign a classroom to the teacher");
  }

  const teacherAlreadyAssigned = await Classroom.findOne({
    teacher: classroom,
  });

  if (teacherAlreadyAssigned) {
    throw new ApiError(400, "Teacher is already assigned to this classroom");
  }

  const teacherExists = await User.findOne({ email });

  if (teacherExists) {
    throw new ApiError(400, "User already exists with this email");
  }

  const teacher = await User.create({
    name,
    email,
    password,
    role: "TEACHER",
    organization: req.user.organization,
  });

  await Classroom.findByIdAndUpdate(classroom, { teacher: teacher._id });

  const createdTeacher = await User.findById(teacher._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(200, createdTeacher, "Teacher created successfully"));
});

const getTeacherById = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  if (!teacherId) {
    throw new ApiError(400, "Please provide a teacher id");
  }

  const teacher = await User.findById(teacherId);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return res.status(200).json(new ApiResponse(200, teacher, "Teacher details"));
});

const updateTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;
  const { name, email, password, classroom } = req.body;

  if (!teacherId) {
    throw new ApiError(400, "Please assign a Teacher");
  }

  const teacher = await User.findById(teacherId);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  if (teacher.role !== "TEACHER") {
    throw new ApiError(400, "User is not a teacher");
  }

  if (teacher.organization.toString() !== req.user.organization.toString()) {
    throw new ApiError(400, "Teacher does not belong to your organization");
  }

  if (name) {
    teacher.name = name;
  }

  if (email) {
    teacher.email = email;
  }

  if (password) {
    teacher.password = password;
  }

  if (classroom) {
    const teacherAlreadyAssigned = await Classroom.findOne({
      teacher: teacherId,
    });

    if (
      teacherAlreadyAssigned &&
      teacherAlreadyAssigned._id.toString() !== classroom
    ) {
      throw new ApiError(400, "Teacher is already assigned to this classroom");
    }

    await Classroom.findByIdAndUpdate(teacher.classroom, { teacher: null });

    await Classroom.findByIdAndUpdate(classroom, { teacher: teacherId });
  }

  await teacher.save();

  return res
    .status(200)
    .json(new ApiResponse(200, teacher, "Teacher updated successfully"));
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  if (!teacherId) {
    throw new ApiError(400, "Please provide a teacher id");
  }

  const teacherExists = await User.findById(teacherId);
  if (!teacherExists) {
    throw new ApiError(404, "Teacher not found");
  }

  if (teacherExists.role !== "TEACHER") {
    throw new ApiError(400, "User is not a teacher");
  }

  if (
    teacherExists.organization.toString() !== req.user.organization.toString()
  ) {
    throw new ApiError(400, "Teacher does not belong to your organization");
  }

  await Classroom.findOneAndUpdate({ teacher: teacherId }, { teacher: null });

  await User.findByIdAndDelete(teacherId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Teacher deleted successfully"));
});

const getTeachers = asyncHandler(async (req, res) => {
  const userOrganization = req.user.organization;

  const teachers = await User.aggregate([
    { $match: { role: "TEACHER", organization: userOrganization } }, // Match only teachers in the same organization
    {
      $lookup: {
        from: "classrooms", // Collection to join with
        localField: "_id", // Field from the input documents (teacher _id)
        foreignField: "teacher", // Field from the classrooms collection
        as: "classroom", // Output array field
      },
    },
    {
      $unwind: {
        path: "$classroom",
        preserveNullAndEmptyArrays: true, // Preserve teachers without classrooms
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        role: 1,
        classroom: "$classroom",
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        teachers,
        "All teachers' classrooms fetched successfully"
      )
    );
});

export {
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeachers,
};
