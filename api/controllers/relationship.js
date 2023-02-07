import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  if (req.query.followeduserid) {
    const q =
      "SELECT followeruserid FROM relationships WHERE followeduserid = ?";
    db.query(q, [req.query.followeduserid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data.map((relationship) => relationship.followeruserid));
    });
  } else if (req.query.followeruserid) {
    const q =
      "SELECT followeduserid FROM relationships WHERE followeruserid = ?";
    db.query(q, [req.query.followeruserid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data.map((relationship) => relationship.followeduserid));
    });
  }
};
export const getRelationshipsYugabyte = (req, res) => {
  if (req.query.followeduserid) {
    const q =
      "SELECT followeruserid FROM relationships WHERE followeduserid = $1";
    db.query(q, [req.query.followeduserid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data?.rows?.map((relationship) => relationship.followeruserid));
    });
  } else if (req.query.followeruserid) {
    const q =
      "SELECT followeduserid FROM relationships WHERE followeruserid = $1";
    db.query(q, [req.query.followeruserid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data?.rows?.map((relationship) => relationship.followeduserid));
    });
  }
};

export const getFollowing = (req, res) => {
  const q = "SELECT followeduserid FROM relationships WHERE followeruserid = ?";

  db.query(q, [req.query.followeruserid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followeduserid));
  });
};
export const getFollowingYugabyte = (req, res) => {
  const q =
    "SELECT followeduserid FROM relationships WHERE followeruserid = $1";

  db.query(q, [req.query.followeruserid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data?.rows?.map((relationship) => relationship.followeduserid));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO relationships (`followeruserid`,`followeduserid`) VALUES (?)";
    const values = [userInfo.id, req.body.userid];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};
export const addRelationshipYugabyte = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO relationships (followeruserid,followeduserid) VALUES ($1, $2)";
    const values = [userInfo.id, req.body.userid];

    db.query(q, values, (err, data) => {
      console.log(err);
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

    const q =
      "DELETE FROM relationships WHERE `followeruserid` = ? AND `followeduserid` = ?";

    db.query(q, [userInfo.id, req.query.userid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};

export const deleteRelationshipYugabyte = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM relationships WHERE followeruserid = $1 AND followeduserid = $2";

    db.query(q, [userInfo.id, req.query.userid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};
