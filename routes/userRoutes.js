import express from "express";
import { getUsers } from "../controller/users.js";

const router = express.Router();

const userRoutes = (pool, jwtSecret) => {
  router.get("/", getUsers(pool, jwtSecret));

  return router;
};

export default userRoutes;
