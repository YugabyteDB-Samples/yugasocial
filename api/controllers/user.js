import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import QueryFactory from "../factories/QueryFactory.js";
const { DB_TYPE } = process.env;

export const getUsers = (req, res) => {
  const userid = req.query.userid;
  const q = QueryFactory.get("getUsers");

  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (DB_TYPE === "yugabyte") data = data.rows;
    const info = data.map((d) => {
      const { password, ...info } = d;
      return info;
    });
    return res.json(info);
  });
};

export const getUser = (req, res) => {
  const userid = req.params.userid;
  const q = QueryFactory.get("getUserById");

  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (DB_TYPE === "yugabyte") data = data.rows;
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = QueryFactory.get("updateUser");

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilepic,
        req.body.coverpic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (DB_TYPE === "mysql" && data.affectedRows > 0)
          return res.json("Updated!");
        if (DB_TYPE === "yugabyte" && data.rowCount > 0)
          return res.json("Updated!");
        return res.status(403).json("You can update only your account!");
      }
    );
  });
};
