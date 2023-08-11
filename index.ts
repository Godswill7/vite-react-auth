import express, { Application } from "express"
import mongoose from "mongoose";
import { mainApp } from "./mainApp";

const port : number = 8990;

const app:Application = express();

const url = "mongodb+srv://udidagodswill7:udidagodswill7@cluster0.04h6rbg.mongodb.net/querydb?retryWrites=true&w=majority";
const url2 = "mongodb://localhost:27017/queryDb"
mainApp(app)

const server = app.listen(port, () => {
    mongoose.connect(url2).then(() => {
    console.log("")
console.log("Server is up and running", port)
    })
})

process.on("uncaughtException",(err:any)=>{
    console.log("Server is shutting down due to uncaught exception",err)
process.exit(1);
})

process.on("unhandledRejection",(reason:any) =>{
console.log("Server is shutting down due to unhandled rejection",reason)
server.close(()=>{
    process.exit(1);
})
})