import express from "express";
import {
  login,
  loginYugabyte,
  register,
  registerYugabyte,
  logout,
} from "../controllers/auth.js";

import { db } from "../connect.js";
const router = express.Router();

if (process.env.DB_TYPE === "mysql") {
  router.post("/login", login);
  router.post("/register", register);
  router.post("/logout", logout);
} else {
  router.post("/login", loginYugabyte);
  router.post("/registerYugabyte", register);
  router.post("/logout", logout);
}

export default router;
