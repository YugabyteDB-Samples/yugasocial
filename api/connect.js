import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Pool } = require("@yugabytedb/pg");
import mysql from "mysql";
function setDatabaseConnection() {
  if (process.env.DB_TYPE === "mysql") {
    return mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 100,
    });
  } else if (process.env.DB_TYPE === "yugabyte") {
    let config = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: 5433,
      database: process.env.DB_NAME,
      min: 5,
      max: 100,
    };

    if (process.env.DB_DEPLOYMENT_TYPE === "docker") {
      return new Pool(config);
    } else {
      config["ssl"] = { rejectUnauthorized: false };
      return new Pool(config);
    }
  }
}
const connection = setDatabaseConnection();
try {
  connection.query("SELECT 1 = 1;");
  console.log("connection", connection);
} catch (e) {
  console.log(e);
}
export let db = connection;
