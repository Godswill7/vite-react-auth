import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import { HTTP } from "../Error/mainError";


export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      const confirmPassword = await bcrypt.compare(password, user?.password!);
      if (confirmPassword) {
        return res.status(HTTP.CREATE).json({
          message: `Welcome Back${user.name}`,
          data: user.id,
        });
      } else {
        res.status(HTTP.BAD).json({
          message: "Incorrect password!!!",
        });
      }
    } else {
      res.status(HTTP.BAD).json({
        message: "User Not Found!!!",
      });
    }
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error Signing in User",
    });
  }
};

export const createUser = async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt:any = await bcrypt.genSalt(10);
    const hash:any = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hash,
    });
    res.status(HTTP.CREATE).json({
      messsage: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error creating user",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find().sort({
      createdAt: -1,
    });
    res.status(HTTP.OK).json({
      message: "All Users Gotten",
      data: user,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error getting users",
    });
  }
};

export const getOneUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);
    res.status(HTTP.OK).json({
      message: "Single user found",
      data: user?._id,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error finding one user",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { name } = req.body;
    const user = await userModel.findByIdAndUpdate(userID,
      { name },
    {new: true});
    res.status(HTTP.UPDATE).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error updating user",
    });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findByIdAndDelete( userID );
    res.status(HTTP.DELETE).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error deleting user",
    });
  }
};
