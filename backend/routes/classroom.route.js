import { verifyJWT } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

import {
  createClassroom,
  getClassroomById,
  getAllClassrooms,
  updateClassroom,
  deleteClassroom,
} from "../controllers/classroom.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/", authorizeRole(["PRINCIPAL"]), createClassroom);

router.get("/", authorizeRole(["PRINCIPAL"]), getAllClassrooms);

router.get(
  "/:id",
  authorizeRole(["PRINCIPAL", "TEACHER", "STUDENT"]),
  getClassroomById
);
router.patch("/:id", authorizeRole(["PRINCIPAL"]), updateClassroom);
router.delete("/:id", authorizeRole(["PRINCIPAL"]), deleteClassroom);

export default router;
