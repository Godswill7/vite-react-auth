import express from 'express';
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../controller/userController';

const router = express.Router();

router.route("/create").post(createUser);
router.route("/get-users").get(getAllUsers);
router.route("/:userID/get-one-user").get(getOneUser);
router.route("/:userID/update-user").patch(updateUser);
router.route("/:userID/delete-user").delete(deleteUser);

export default router;