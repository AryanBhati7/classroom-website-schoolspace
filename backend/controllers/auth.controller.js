import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId, role) => {
  try {
    const user = await User.findById(userId);
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

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, organization } = req.body;

  if (!name || !email || !password || !organization) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  const createdUser = await User.create({
    name,
    email,
    password,
    role: "PRINCIPAL",
    organization,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    createdUser._id
  );
  const loggedInUser = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );
  res.setHeader("Set-Cookie", [
    `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
    `refreshToken=${refreshToken}; Max-Age=${15 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
  ]);

  return res
    .status(201)
    .json(new ApiResponse(200, loggedInUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found with this email");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
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
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      "Logged in Successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = null;

  await user.save({ validateBeforeSave: false });

  res.setHeader("Set-Cookie", [
    "accessToken=; Max-Age=-1; Path=/; HttpOnly; Secure; SameSite=None",
    "refreshToken=; Max-Age=-1; Path=/; HttpOnly; Secure; SameSite=None",
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "Current User fetched successfully"
      )
    );
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
