import { config } from "dotenv";
config();

export const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MYSQL,
    connectTimeout: 60000,
  },
  // listPerPage: 10,
};
