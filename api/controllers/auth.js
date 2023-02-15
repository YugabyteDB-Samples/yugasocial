import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QueryService from "../services/QueryService.js";
const { DB_TYPE } = process.env;
export const register = (req, res) => {
  //CHECK USER IF EXISTS
  const q = QueryService.get("selectUserByUsername");

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = QueryService.get("insertUser");

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    let properties = DB_TYPE === "mysql" ? [values] : values;

    db.query(q, properties, (err, data) => {
      if (err) return res.status(500).json(err);
      login(req, res);
    });
  });
};

export const login = (req, res) => {
  const q = QueryService.get("selectUserByUsername");

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    let storedUserPassword;
    let id;
    if (DB_TYPE === "mysql") {
      storedUserPassword = data[0].password;
      id = data[0].id;
    } else {
      storedUserPassword = data.rows?.[0]?.password;
      id = data.rows?.[0]?.id;
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      storedUserPassword
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: id }, "secretkey");

    const { password, ...others } =
      DB_TYPE === "mysql" ? data[0] : data.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  console.log("Logging out user.");
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
