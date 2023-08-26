import express from "express";
import { config } from "dotenv";
import cors from "cors";
import user_routes from "./routes/users.js";

config();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/", user_routes);

app.listen(process.env.PORT || 8001, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
