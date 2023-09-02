import express from "express";
import { getUsers } from "../controller/users.js";

const router = express.Router();

const userRoutes = (pool) => {
  router.get("/", getUsers(pool));

  return router;
};

export default userRoutes;
