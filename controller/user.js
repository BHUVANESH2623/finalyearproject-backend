import db from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = (req , res) => {
    const studentExist = `SELECT * from students WHERE regno = ?`;
    const driverExist = `SELECT * from drivers WHERE empid = ?`;
    const newStudent = `INSERT INTO students(name , email , regno , phoneno , address , altno , password) VALUES(?)`;
    const newDriver = `INSERT INTO drivers(name , empid , phoneno , address , altno , password , email) VALUES(?)`;
    const role = req.body.role;

    if(role === 'student'){
        db.query(studentExist,[req.body.regno],(err , data) => {
            if(err){
                res.status(500).json("register error: "+ err);
                return;
            }
            if(data.length){
                res.status(400).json("User already exist");
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password , salt);
            const values = [req.body.name , req.body.email , req.body.regno , req.body.phoneno , req.body.address , req.body.altno , hashedPassword];
            
            db.query(newStudent,[values],(err , data) => {
                if(err) return res.status(500).json(err);

                const userId = data?.length + 1  // Assuming your user ID is auto-incremented
                const token = jwt.sign({ id: userId } , process.env.SECRET_KEY)
                const {password,...others} = req.body;

                res.cookie("bus_tracking_key" , token ,{
                    httpOnly: true,
                    secure: true
                }).status(200).json({ id: userId, ...others });
            })
        })
    }
    if(role === 'driver'){
        db.query(driverExist,[req.body.empid],(err , data) => {
            if(err){
                res.status(500).json("register error: "+ err);
                return;
            }
            if(data.length){
                res.status(400).json("User already exist");
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password , salt);
            const values = [req.body.name , req.body.empid , req.body.phoneno , req.body.address , req.body.altno , hashedPassword , req.body.email];
            
            db.query(newDriver,[values],(err , data) => {
                if(err) return res.status(500).json(err);

                const userId = data?.length + 1  // Assuming your user ID is auto-incremented
                const token = jwt.sign({ id: userId } , process.env.SECRET_KEY)
                const {password,...others} = req.body;

                res.cookie("bus_tracking_key" , token ,{
                    httpOnly: true,
                    secure: true
                }).status(200).json({ id: userId, ...others });
            })
        })
    }
}

export const login = ( req , res) => {}