import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
// import { HTTP, mainError } from "./Error/mainError";
import users from "./router/userRoute"
import tasks from "./router/taskRoute"
import { errHandler } from "./Error/errorHandler"

export const mainApp = (app:Application) =>{
app.use(express.json());
app.use(
    cors({
        origin:" http://localhost:5173/",
        methods: ["GET","READ", "POST", "DELETE"],
    }),
    );
    
    app.use("/api/v1", users)
    app.use("/api/v1", tasks)

// app.all("*",(req:Request, res:Response,next:NextFunction) => {
// new mainError({
//     name: "Error from Route",
//     message: "Error due to Incorrect Route",
//     status: HTTP.BAD,
//     success: false,
// })
// } )
      app.use(errHandler)

}