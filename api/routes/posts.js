import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
  getPostsYugabyte,
  addPostYugabyte,
  deletePostYugabyte,
} from "../controllers/post.js";

const router = express.Router();

if (process.env.DB_TYPE === "mysql") {
  router.get("/", getPosts);
  router.post("/", addPost);
  router.delete("/:id", deletePost);
} else {
  router.get("/", getPostsYugabyte);
  router.post("/", addPostYugabyte);
  router.delete("/:id", deletePostYugabyte);
}

export default router;
