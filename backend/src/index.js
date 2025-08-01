import express from "express"
import authroute from "./routes/auth.route.js";
import msgrouter from "./routes/message.routes.js"
import dotenv from "dotenv"
import { connectdb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server } from "./lib/socket.js";

dotenv.config();
    const port=process.env.PORT
   
    
    app.use(express.json(({ limit: "10mb" })));
    app.use(cookieParser());
     app.use(cors({
        origin:'http://localhost:5173',
        credentials: true  
    }));

   

    app.use("/api/auth",authroute);
    app.use("/api/message",msgrouter);

server.listen(port,async()=>{
   await connectdb();
        console.log(`The server is starting in ${port} port. `)
 })







