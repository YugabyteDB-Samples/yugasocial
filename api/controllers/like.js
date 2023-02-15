import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import QueryFactory from "../factories/QueryFactory.js";
const { DB_TYPE } = process.env;
export const getLikes = (req, res) => {
  const q = QueryFactory.get("likesForPost");

  db.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err);

    if (DB_TYPE === "yugabyte") data = data?.rows;
    return res.status(200).json(data.map((like) => like.userid));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryFactory.get("addLikeToPost");
    const values = [userInfo.id, req.body.postid];
    const properties = DB_TYPE === "mysql" ? [values] : values;
    db.query(q, properties, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  });
};

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryFactory.get("deleteLikeForPost");

    db.query(q, [userInfo.id, req.query.postid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  });
};
