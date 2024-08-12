import { verifyJWT } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";
import {
  createTimetable,
  updateTimetable,
  deleteTimetable,
  getTimeTablebyClass,
  getAllTimetables,
} from "../controllers/timetable.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/", authorizeRole(["TEACHER"]), createTimetable);
router.put("/:id", authorizeRole(["TEACHER", "PRINCIPAL"]), updateTimetable);
router.delete("/:id", authorizeRole(["TEACHER"]), deleteTimetable);
router.get("/", getAllTimetables);
router.get("/:classroomId", getTimeTablebyClass);

export default router;
