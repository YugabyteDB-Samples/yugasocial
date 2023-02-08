// const config = {
//   database: "yugabyte",
//   user: "admin",
//   password: process.env.PASSWORD,
//   host: `${process.env.REGION}.7aa027c3-7432-431d-ba3c-431495dea0b8.gcp.ybdb.io`,
//   port: 5433,
//   min: 0,
//   max: 5,

//   // this object will be passed to the TLSSocket constructor
//   ssl: {
//     rejectUnauthorized: false,
//     ca: fs
//       .readFileSync("/Users/bhoyer/certs/yftt-id-generation/root.crt")
//       .toString(),
//   },
// };
// import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Pool } = require("@yugabytedb/pg");
import mysql from "mysql";
function setDatabaseConnection() {
  console.log(process.env);
  if (process.env.DB_TYPE === "mysql") {
    return mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 100,
    });
  } else {
    return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: 5433,
      database: process.env.DB_NAME,
      min: 5,
      max: 100,
      ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync("/app/certs/yb-pg-voyager/root.crt").toString(),
      },
    });
  }
}
const connection = setDatabaseConnection();
export let db = connection;
