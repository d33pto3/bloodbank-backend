import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: process.env.HOST_MYSQL,
  user: "toe",
  password: "deepdeep",
  database: "bloodbank",
});

export default connection;
