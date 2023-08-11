import express from "express";
import { createTask, deleteTask, getOneTask, getTask } from "../controller/taskController";

const router = express.Router();

router.route("/:userID/create-task").post(createTask)
router.route("/:taskID/get-one-task").get(getOneTask)
router.route("/get-tasks").get(getTask)
router.route("/:taskID/delete-task").delete(deleteTask)

export default router;