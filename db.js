import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection(
    `mysql://avnadmin:${process.env.DB_PASSWORD}@finalyear04-project-projectdev.g.aivencloud.com:20951/finalyearproject`
);

db.connect((err)=>{
    if(err) console.log('DB connection failed:  '+err);
    else console.log('DB connected');
});

export default db;