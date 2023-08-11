import mongoose from "mongoose";

export interface iTask {
    name: string;
}

interface iTaskData extends iTask , mongoose.Document{}

const authModel = new mongoose.Schema({
    name: {
        type: String,
    },
    userID: {
        type: String,
    }
},
    {
    timestamps: true,
});

export default mongoose.model<iTaskData>("tasks",authModel)

