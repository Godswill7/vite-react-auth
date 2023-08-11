import mongoose from "mongoose";

export interface iUser {
    name?: string;
    email?: string;
    password?: string;
    task?: {}[]
}

interface iUserData extends iUser , mongoose.Document{}

const userModel = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    task: [
        {
            type: String,
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model<iUserData>("users",userModel)

