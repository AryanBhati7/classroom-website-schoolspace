import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", authorizeRole(["PRINCIPAL"]), createStudent);

router.get(
  "/",
  authorizeRole(["PRINCIPAL", "TEACHER", "STUDENT"]),
  getAllStudents
);
router.get("/:id", getStudentById);
router.patch("/:id", authorizeRole(["PRINCIPAL", "TEACHER"]), updateStudent);
router.delete("/:id", authorizeRole(["PRINCIPAL", "TEACHER"]), deleteStudent);

export default router;
