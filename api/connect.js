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
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Pool } = require("@yugabytedb/pg");
import mysql from "mysql";
function setDatabaseConnection(dbType) {
  console.log("DB TYPE", dbType);
  if (process.env.DB_TYPE === "mysql") {
    return mysql.createConnection({
      host: process.env.DB_HOST, //running in Docker, 'db' is name of database container
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  } else {
    return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: 5433,
      database: process.env.DB_NAME,
      min: 1,
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
