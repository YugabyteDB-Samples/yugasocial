import express from "express";
import {
  getUser,
  getUsers,
  getUsersYugabyte,
  getUserYugabyte,
  updateUser,
  updateUserYugabyte,
} from "../controllers/user.js";

const router = express.Router();

if (process.env.DB_TYPE === "mysql") {
  router.get("/", getUsers);
  router.get("/find/:userid", getUser);
  router.put("/", updateUser);
} else {
  router.get("/", getUsersYugabyte);
  router.get("/find/:userid", getUserYugabyte);
  router.put("/", updateUserYugabyte);
}

export default router;
