import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Principal } from "../models/principal.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import { Student } from "../models/student.model.js";
import { generateAccessAndRefreshTokens } from "../utils/generateAccessAndRefreshToken.js";

const registerNewPrincipal = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const existingPrincipal = await Principal.findOne({ email });
  const existingTeacher = await Teacher.findOne({ email });
  const existingStudent = await Student.findOne({ email });

  if (existingPrincipal || existingTeacher || existingStudent) {
    throw new ApiError(400, "User already exists with this email");
  }

  const createdPrincipal = await Principal.create({ name, email, password });

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdPrincipal,
        "Principal User Registered Successfully"
      )
    );
});

const loginPrincipal = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const principal = await Principal.findOne({ email });

  if (!principal) {
    throw new ApiError(400, "Principal not found with this email");
  }

  const isPasswordValid = await principal.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    principal._id,
    "PRINCIPAL"
  );

  const loggedInPrincipal = await Principal.findById(principal._id).select(
    "-password -refreshToken"
  );

  res.setHeader("Set-Cookie", [
    `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
    `refreshToken=${refreshToken}; Max-Age=${15 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
  ]);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        principal: loggedInPrincipal,
        accessToken,
        refreshToken,
      },
      "Successfully Logged in as Principal"
    )
  );
});
