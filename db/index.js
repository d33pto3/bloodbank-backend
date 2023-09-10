import { config } from "dotenv";
import mysql2 from "mysql2";
config();

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_MYSQL,
});

export default connection;
