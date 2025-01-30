import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRouter from "./route/user.js";
import busRoutes from './route/busroute.js';
import mongodb from './mongodb.js';

const app = express();
mongodb()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user',userRouter);
app.use('/routes',busRoutes);

app.listen(8080,()=>{
    console.log("server listening on port 8080")
})