import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import QueryService from "../services/QueryService.js";
const { DB_TYPE } = process.env;
export const getRelationships = (req, res) => {
  if (req.query.followeduserid) {
    const q = QueryService.get("getRelationshipsFromFollowedUser");
    db.query(q, [req.query.followeduserid], (err, data) => {
      console.log(err);
      if (err) return res.status(500).json(err);
      if (DB_TYPE === "yugabyte") data = data.rows;
      return res
        .status(200)
        .json(data.map((relationship) => relationship.followeruserid));
    });
  } else if (req.query.followeruserid) {
    const q = QueryService.get("getRelationshipsFromFollowerUser");
    db.query(q, [req.query.followeruserid], (err, data) => {
      if (err) return res.status(500).json(err);
      if (DB_TYPE === "yugabyte") data = data.rows;
      return res
        .status(200)
        .json(data.map((relationship) => relationship.followeduserid));
    });
  }
};

export const getFollowing = (req, res) => {
  const q = QueryService.get("getFollowing");

  db.query(q, [req.query.followeruserid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (DB_TYPE === "yugabyte") data = data.rows;
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followeduserid));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryService.get("addRelationship");
    const values = [userInfo.id, req.body.userid];

    const properties = DB_TYPE === "mysql" ? [values] : values;

    db.query(q, properties, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryService.get("deleteRelationship");

    db.query(q, [userInfo.id, req.query.userid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};
