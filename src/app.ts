import express from "express";
import cors from "cors";
import logger from "morgan";

import { client } from "./db";

import burgerRoutes from "./routes/burger";

// Connect Postgresql database
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("success!");
  }
});

// Create Express server
const app = express();

// Express configuration
app.use(logger("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3001);

app.use("/burger", burgerRoutes);

export default app;
