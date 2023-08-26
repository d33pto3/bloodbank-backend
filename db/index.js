import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "toe",
  password: "deepdeep",
  database: "bloodbank",
});

export default connection;
