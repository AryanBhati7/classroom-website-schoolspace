import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin:
      process.env.MODE === "development"
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

//routes declaration
// http://localhost:8000/api/v1/

export { app };
