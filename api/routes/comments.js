import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  getCommentsYugabyte,
  addCommentYugabyte,
  deleteCommentYugabyte,
} from "../controllers/comment.js";

const router = express.Router();

if (process.env.DB_TYPE === "mysql") {
  router.get("/", getComments);
  router.post("/", addComment);
  router.delete("/:id", deleteComment);
} else {
  router.get("/", getCommentsYugabyte);
  router.post("/", addCommentYugabyte);
  router.delete("/:id", deleteCommentYugabyte);
}

export default router;
