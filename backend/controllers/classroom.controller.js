import { Classroom } from "../models/classroom.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createClassroom = asyncHandler(async (req, res) => {
  const { name, teacher, schedule } = req.body;

  if (!name) {
    throw new ApiError(400, "Please provide a name for the classroom");
  }

  if (!Array.isArray(schedule) || schedule.length === 0) {
    throw new ApiError(400, "Classroom schedule must have at least one day");
  }

  const classroomExists = await Classroom.findOne({ name });
  if (classroomExists) {
    throw new ApiError(400, "Classroom already exists with this name");
  }

  if (teacher) {
    const teacherExists = await User.findById(teacher);
    if (!teacherExists) {
      throw new ApiError(404, "Teacher not found");
    }

    const teacherAlreadyAssigned = await Classroom.findOne({
      teacher: teacher,
    });

    if (teacherAlreadyAssigned) {
      throw new ApiError(
        400,
        "This teacher is already assigned to a different classroom"
      );
    }
  }

  const classroom = await Classroom.create({
    name,
    teacher: teacher || null,
    schedule,
    organization: req.user.organization,
  });

  res.status(201).json(201, classroom, "Classroom created successfully");
});

const getClassroomById = asyncHandler(async (req, res) => {
  const classRoomId = req.params.id;

  if (!classRoomId) {
    throw new ApiError(400, "Please provide a classroom id");
  }

  const classroom = await Classroom.findById(classRoomId)
    .populate("teacher")
    .populate("students");

  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, classroom, "Classroom details"));
});

const getAllClassrooms = asyncHandler(async (req, res) => {
  const userOrganization = req.user.organization;

  const classrooms = await Classroom.find({ organization: userOrganization })
    .populate("teacher")
    .populate("students");

  return res
    .status(200)
    .json(new ApiResponse(200, classrooms, "All classrooms"));
});

const updateClassroom = asyncHandler(async (req, res) => {
  const classRoomId = req.params.id;
  const { name, teacher, schedule } = req.body;

  if (!classRoomId) {
    throw new ApiError(400, "Please provide a classroom id");
  }

  const classroom = await Classroom.findById(classRoomId);
  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }

  if (name) {
    classroom.name = name;
  }

  if (Array.isArray(schedule) && schedule.length > 0) {
    classroom.schedule = schedule;
  }

  if (teacher) {
    const teacherExists = await User.findById(teacher);
    if (!teacherExists) {
      throw new ApiError(404, "Teacher not found");
    }

    const teacherAlreadyAssigned = await Classroom.findOne({ teacher });
    if (
      teacherAlreadyAssigned &&
      teacherAlreadyAssigned._id.toString() !== classRoomId
    ) {
      throw new ApiError(
        400,
        "This teacher is already assigned to a different classroom"
      );
    }

    await Classroom.updateMany({ teacher }, { $set: { teacher: null } });
    classroom.teacher = teacher;
  } else {
    classroom.teacher = null;
  }

  await classroom.save();

  res
    .status(200)
    .json(new ApiResponse(200, classroom, "Classroom updated successfully"));
});

const deleteClassroom = asyncHandler(async (req, res) => {
  const classRoomId = req.params.id;

  if (!classRoomId) {
    throw new ApiError(400, "Please provide a classroom id");
  }

  const classroom = await Classroom.findById(classRoomId);

  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }

  const studentIds = classroom.students;

  await User.deleteMany({ _id: { $in: studentIds } });

  await Classroom.findByIdAndDelete(classRoomId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Classroom and students deleted successfully")
    );
});

export {
  createClassroom,
  getClassroomById,
  getAllClassrooms,
  updateClassroom,
  deleteClassroom,
};
