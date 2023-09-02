import express from "express";
import { signup } from "../controller/signup.js";

const router = express.Router();

const signupRoutes = (pool) => {
  router.post("/", signup(pool));
  return router;
};

export default signupRoutes;
