import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
  const userid = req.query.userid;
  const q = "SELECT * FROM users WHERE id != ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    const info = data.map((d) => {
      const { password, ...info } = d;
      return info;
    });
    return res.json(info);
  });
};
export const getUsersYugabyte = (req, res) => {
  const userid = req.query.userid;
  const q = "SELECT * FROM users WHERE id != $1";

  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    const info = data?.rows?.map((d) => {
      const { password, ...info } = d;
      return info;
    });
    return res.json(info);
  });
};
export const getUser = (req, res) => {
  const userid = req.params.userid;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};
export const getUserYugabyte = (req, res) => {
  const userid = req.params.userid;
  const q = "SELECT * FROM users WHERE id = $1";

  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    const d = data?.rows[0];
    const { password, ...info } = d;
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilepic`=?,`coverpic`=? WHERE id=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverpic,
        req.body.profilepic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your account!");
      }
    );
  });
};
export const updateUserYugabyte = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET name = $1,city = $2, website = $3, profilepic = $4, coverpic = $5 WHERE id = $6";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverpic,
        req.body.profilepic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.rowCount > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your account!");
      }
    );
  });
};
