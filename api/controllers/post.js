import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import QueryService from "../services/QueryService.js";
const { DB_TYPE } = process.env;

export const getPosts = (req, res) => {
  const userid = req.query.userid;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      userid !== "undefined"
        ? QueryService.get("getPostsForUser")
        : QueryService.get("getPostsForUserAndFollowedUsers");

    const values =
      userid !== "undefined" ? [userid] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (DB_TYPE === "yugabyte") data = data.rows;
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryService.get("addPost");
    const values = [
      req.body.description,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    const properties = DB_TYPE === "mysql" ? [values] : values;
    db.query(q, properties, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryService.get("deletePost");

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (DB_TYPE == "mysql" && data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      if (DB_TYPE == "yugabyte" && data.rowCount > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
