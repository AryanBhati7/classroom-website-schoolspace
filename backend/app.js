import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin:
      process.env.MODE === "dev"
        ? process.env.CORS_ORIGIN_DEV
        : process.env.CORS_ORIGIN_PRODUCTION,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

//router imports

import authRoutes from "./routes/auth.route.js";
import classroomRoutes from "./routes/classroom.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import studentRoutes from "./routes/student.route.js";
import timetableRoutes from "./routes/timetable.route.js";
//routes declaration
// http://localhost:8000/api

app.use("/api/auth", authRoutes);
app.use("/api/classroom", classroomRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/timetable", timetableRoutes);

export { app };
