import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  schedule: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        required: true,
      },
      periods: [
        {
          subject: String,
          startTime: String,
          endTime: String,
        },
      ],
    },
  ],
});

export const TimeTable = mongoose.model("TimeTable", timetableSchema);
