import { Timetable } from "../models/timeTable.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Classroom } from "../models/classroom.model.js";

const createTimetable = asyncHandler(async (req, res) => {
  const { subject, day, startTime, endTime, classroom } = req.body;
  const teacherId = req.user._id; // Assuming teacher is logged in and req.user contains the teacher's info

  // Validation: Check if the period is within the classroom's time and does not overlap with other periods
  const classroomInfo = await Classroom.findById(classroom);
  if (!classroomInfo) {
    throw new ApiError(404, "Classroom not found");
  }

  // Check if the period is within the classroom's schedule
  const isWithinSchedule = classroomInfo.schedule.some(
    (schedule) =>
      schedule.days === day &&
      schedule.startTime <= startTime &&
      schedule.endTime >= endTime
  );

  if (!isWithinSchedule) {
    throw new ApiError(400, "Period is outside the classroom's schedule");
  }

  // Check for overlapping periods
  const existingTimetables = await Timetable.find({
    classroom,
    day,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
    ],
  });

  if (existingTimetables.length > 0) {
    throw new ApiError(400, "Timetable conflicts with existing periods");
  }

  const timetable = new Timetable({
    subject,
    day,
    startTime,
    endTime,
    classroom,
    teacher: teacherId,
  });

  await timetable.save();

  res
    .status(201)
    .json(new ApiResponse(201, timetable, "Timetable created successfully"));
});

const updateTimetable = asyncHandler(async (req, res) => {
  const { subject, day, startTime, endTime, classroom } = req.body;
  let teacherId;

  if (req.user.role === "TEACHER") {
    teacherId = req.user._id;
  }

  const timetableId = req.params.id;
  const timetable = await Timetable.findById(timetableId);

  if (!timetable) {
    throw new ApiError(404, "Timetable not found");
  }

  // Validation: Check if the period is within the classroom's time and does not overlap with other periods
  const classroomInfo = await Classroom.findById(classroom);
  if (!classroomInfo) {
    throw new ApiError(404, "Classroom not found");
  }

  // Check if the period is within the classroom's schedule
  const isWithinSchedule = classroomInfo.schedule.some(
    (schedule) =>
      schedule.days === day &&
      schedule.startTime <= startTime &&
      schedule.endTime >= endTime
  );

  if (!isWithinSchedule) {
    throw new ApiError(400, "Period is outside the classroom's schedule");
  }

  // Check for overlapping periods
  const existingTimetables = await Timetable.find({
    classroom,
    day,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
    ],
  });

  if (existingTimetables.length > 0) {
    throw new ApiError(400, "Timetable conflicts with existing periods");
  }

  timetable.subject = subject;
  timetable.day = day;
  timetable.startTime = startTime;
  timetable.endTime = endTime;
  timetable.classroom = classroom;
  timetable.teacher = teacherId;

  await timetable.save();

  res
    .status(200)
    .json(new ApiResponse(200, timetable, "Timetable updated successfully"));
});

const getAllTimetables = asyncHandler(async (req, res) => {
  const timetables = await Timetable.find().populate("classroom", "name");

  res.json(new ApiResponse(200, timetables));
});

const getTimeTablebyClass = asyncHandler(async (req, res) => {
  const { classroomId } = req.params;
  const timetables = await Timetable.find({ classroom: classroomId }).populate(
    "classroom",
    "name"
  );

  res.json(new ApiResponse(200, timetables));
});

const deleteTimetable = asyncHandler(async (req, res) => {
  const timetableId = req.params.id;

  const timetable = await Timetable.findById(id);

  if (!timetable) {
    throw new ApiError(404, "Timetable not found");
  }
  await Timetable.findByIdAndDelete(timetableId);

  res.json(new ApiResponse(200, null, "Timetable deleted successfully"));
});

export {
  createTimetable,
  getAllTimetables,
  getTimeTablebyClass,
  updateTimetable,
  deleteTimetable,
};
