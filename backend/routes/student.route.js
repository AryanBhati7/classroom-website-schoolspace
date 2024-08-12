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
router.use(authorizeRole(["PRINCIPAL", "TEACHER"]));

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
