import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Classroom } from "../models/classroom.model.js";
import { User } from "../models/user.model.js";
import { Timetable } from "../models/timeTable.model.js";

const generatePrincipalDashboard = asyncHandler(async (req, res) => {
  const organization = req.user?.organization;

  if (!organization) {
    throw new ApiError(400, "Organization not found");
  }

  const classrooms = await Classroom.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "teacher",
        foreignField: "_id",
        as: "teacherDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "students",
        foreignField: "_id",
        as: "studentDetails",
      },
    },
    {
      $lookup: {
        from: "timetables",
        localField: "_id",
        foreignField: "classroom",
        as: "timetableDetails",
      },
    },
    {
      $project: {
        classroomName: "$name",
        noOfStudents: { $size: "$studentDetails" },
        assignedTeacher: { $arrayElemAt: ["$teacherDetails.name", 0] },
        timeTableStatus: { $gt: [{ $size: "$timetableDetails" }, 0] },
      },
    },
  ]);

  const response = classrooms.map((classroom, index) => ({
    sr: index + 1,
    classroomName: classroom.classroomName,
    noOfStudents: classroom.noOfStudents,
    assignedTeacher: classroom.assignedTeacher,
    timeTableStatus: classroom.timeTableStatus,
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Principal Dashboard"));
});

const getOrganizationStats = asyncHandler(async (req, res) => {
  const organization = req.user?.organization;
  const role = req.user?.role;

  if (!organization || !role) {
    throw new ApiError(400, "Organization or role not found");
  }

  if (role === "PRINCIPAL") {
    const [classroomCount, teacherCount, studentCount] = await Promise.all([
      Classroom.countDocuments({ organization }),
      User.countDocuments({ organization, role: "TEACHER" }),
      User.countDocuments({ organization, role: "STUDENT" }),
    ]);

    const response = {
      organization,
      numberOfClassrooms: classroomCount,
      numberOfTeachers: teacherCount,
      numberOfStudents: studentCount,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, response, "Organization Stats"));
  } else if (role === "TEACHER") {
    const classroom = await Classroom.findOne({
      organization,
      teacher: req.user._id,
    }).populate("schedule");
    if (!classroom) {
      throw new ApiError(404, "Classroom not found");
    }

    const response = {
      organization,
      className: classroom.name,
      numberOfStudents: classroom.students.length,
      classSchedule: classroom.schedule,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, response, "Organization Stats"));
  } else if (role === "STUDENT") {
    const classroom = await Classroom.findOne({
      organization,
      students: req.user._id,
    }).populate("schedule");
    if (!classroom) {
      throw new ApiError(404, "Classroom not found");
    }

    const response = {
      organization,
      className: classroom.name,
      numberOfStudents: classroom.students.length,
      classSchedule: classroom.schedule,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, response, "Organization Stats"));
  } else {
    throw new ApiError(403, "Unauthorized role");
  }
});

const getClassroomsAndTeachers = asyncHandler(async (req, res) => {
  const organization = req.user?.organization;

  const classrooms = await Classroom.find({ organization }, "_id name");
  const teachers = await User.find(
    { organization, role: "TEACHER" },
    "_id name"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { classrooms, teachers },
        "Classrooms and Teachers fetched successfully"
      )
    );
});

export {
  generatePrincipalDashboard,
  getOrganizationStats,
  getClassroomsAndTeachers,
};
