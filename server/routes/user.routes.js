import express from "express";
import {
  signup,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  signin,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/", signup);
userRouter.post("/login", signin);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
