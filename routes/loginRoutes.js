import express from "express";
import { login } from "../controller/login.js";

const router = express.Router();

const loginRoutes = (pool) => {
  router.post("/", login(pool));
  return router;
};

export default loginRoutes;
