import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

const mysqldb = mysql.createConnection(
    `mysql://avnadmin:${process.env.MYSQLDB_PASSWORD}@finalyear04-project-projectdev.g.aivencloud.com:20951/finalyearproject`
);

mysqldb.connect((err)=>{
    if(err) console.log('MySQLDB connection failed:  '+err);
    else console.log('MySQLDB connected');
});

export default mysqldb;