import express from "express";
import { config } from "dotenv";
import cors from "cors";
import createPool from "./services/db.js";
import userRoutes from "./routes/userRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

config();
const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = createPool(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_MYSQL
);

app.use("/api/users", userRoutes(pool));
app.use("/api/signup", signupRoutes(pool));
app.use("/api/login", loginRoutes(pool));

app.listen(process.env.PORT || 8001, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
