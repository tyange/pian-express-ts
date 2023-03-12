import { Client } from "pg";

import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  user: process.env.PG_USERNAME,
  host: "localhost",
  password: process.env.PG_PW,
  database: process.env.PG_DB,
  port: 5432,
});
