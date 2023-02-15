import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Pool } = require("@yugabytedb/pg");
import mysql from "mysql";
import QueryService from "./services/QueryService.js";

function setDatabaseConnection() {
  console.log("setting database connection");
  QueryService.setDatabaseType(process.env.DB_TYPE);
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

    let pool;
    if (process.env.DB_DEPLOYMENT_TYPE === "docker") {
      pool = new Pool(config);
    } else {
      config["ssl"] = { rejectUnauthorized: false };
      pool = new Pool(config);
    }
    pool.on("connect", (client) => {
      console.log("connect callback");
      client.query("SET search_path TO social");
    });

    return pool;
  }
}
const connection = setDatabaseConnection();
async function verifyConnection() {
  try {
    await connection.query("SELECT 1 = 1;");
    console.log("connection to DB verified");
  } catch (e) {
    console.log(e);
  }
}

verifyConnection();
export let db = connection;
