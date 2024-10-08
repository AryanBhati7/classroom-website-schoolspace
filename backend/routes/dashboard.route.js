import { Router } from "express";
import {
  generatePrincipalDashboard,
  getClassroomsAndTeachers,
  getOrganizationStats,
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();
router.use(verifyJWT);

router.get(
  "/principal",
  authorizeRole(["PRINCIPAL"]),
  generatePrincipalDashboard
);

router.get("/organization-stats", getOrganizationStats);

router.get(
  "/classrooms-teachers",
  authorizeRole(["PRINCIPAL", "TEACHER"]),
  getClassroomsAndTeachers
);

export default router;
