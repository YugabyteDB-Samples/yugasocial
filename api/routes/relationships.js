import express from "express";
import {
  getRelationships,
  addRelationship,
  deleteRelationship,
  getFollowing,
  deleteRelationshipYugabyte,
  addRelationshipYugabyte,
  getFollowingYugabyte,
  getRelationshipsYugabyte,
} from "../controllers/relationship.js";

const router = express.Router();

if (process.env.DB_TYPE === "mysql") {
  router.get("/", getRelationships);
  router.get("/following", getFollowing);
  router.post("/", addRelationship);
  router.delete("/", deleteRelationship);
} else {
  router.get("/", getRelationshipsYugabyte);
  router.get("/following", getFollowingYugabyte);
  router.post("/", addRelationshipYugabyte);
  router.delete("/", deleteRelationshipYugabyte);
}

export default router;
