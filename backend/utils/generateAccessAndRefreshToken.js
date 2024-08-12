import { Principal } from "../models/principal.model";
import { Teacher } from "../models/teacher.model";
import { Student } from "../models/student.model";
import { ApiError } from "./ApiError";
export const generateAccessAndRefreshTokens = async (userId, role) => {
  try {
    let user;

    if (!role) {
      throw new ApiError(501, "Role not mentioned while generating Tokens");
    }
    if (role === "TEACHER") {
      user = await Teacher.findById(userId);
    } else if (role === "PRINCIPAL") {
      user = await Principal.findById(userId);
    } else if (role === "STUDENT") {
      user = await Student.findById(userId);
    } else {
      throw new ApiError(501, "Invalid Role mentioned while generating tokens");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};
