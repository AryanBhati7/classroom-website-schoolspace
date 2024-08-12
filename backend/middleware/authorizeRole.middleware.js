import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authorizeRole = (roles) => {
  if (!roles || !Array.isArray(roles)) {
    throw new ApiError("Roles must be provided as an array in the middleware");
  }

  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access Denied");
    }
    next();
  });
};
