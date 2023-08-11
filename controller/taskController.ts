import { Request, Response } from "express";
import taskModel from "../model/taskModel";
import { HTTP } from "../Error/mainError";
import userModel from "../model/userModel";
import mongoose from "mongoose";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { task } = req.body;

    const user:any = await userModel.findById(userID);

    const tasked = await taskModel.create({
      task,
      userID: user?._id,
      user,
    });
    res.status(HTTP.CREATE).json({
      message: `Task created by ${user?.name}`,
      data: tasked,
    });

    user?.task.push(new mongoose.Types.ObjectId(tasked._id));
    await user.save();
    await tasked.save();
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error creating task",
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await taskModel.find().sort({
      createdAt: -1,
    });
    res.status(HTTP.OK).json({
      message: "All Task Gotten",
      data: task,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      mesage: "Error getting task",
    });
  }
};

export const getOneTask = async (req: Request, res: Response) => {
  try {
    const { taskID } = req.params;
    const task = await taskModel.findById(taskID);
    res.status(HTTP.OK).json({
      message: "Single task found",
      data: task,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Task not found",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskID } = req.params;

    const task = await taskModel.findByIdAndDelete(taskID);
    res.status(HTTP.DELETE).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Task not found",
    });
  }
};
