import express from "express";
import {
  getLikes,
  addLike,
  deleteLike,
  getLikesYugabyte,
  addLikeYugabyte,
  deleteLikeYugabyte,
} from "../controllers/like.js";

const router = express.Router();

if (process.env.DB_TYPE === "mysql") {
  router.get("/", getLikes);
  router.post("/", addLike);
  router.delete("/", deleteLike);
} else {
  router.get("/", getLikesYugabyte);
  router.post("/", addLikeYugabyte);
  router.delete("/", deleteLikeYugabyte);
}

export default router;
