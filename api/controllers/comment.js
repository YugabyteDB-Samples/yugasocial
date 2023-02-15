import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import QueryFactory from "../factories/QueryFactory.js";
const { DB_TYPE } = process.env;
export const getComments = (req, res) => {
  const q = QueryFactory.get("commentsForPost");

  db.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(DB_TYPE === "mysql" ? data : data?.rows);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryFactory.get("addComment");

    const values = [
      req.body.description,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postid,
    ];

    const properties = DB_TYPE === "mysql" ? [values] : values;
    db.query(q, properties, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q = QueryFactory.get("deleteComment");

    db.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (DB_TYPE === "mysql" && data.affectedRows > 0)
        return res.json("Comment has been deleted!");
      if (DB_TYPE === "yugabyte" && data.rowCount > 0)
        return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
  });
};
