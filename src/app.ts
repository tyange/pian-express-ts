import express from "express";
import cors from "cors";
import logger from "morgan";

import { client } from "./db";

import admin from "firebase-admin";
const fbConfig = require("../fbConfig.json");

import burgerRoutes from "./routes/burger";

// Connect Postgresql database
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("success!");
  }
});

// initialized firebase
admin.initializeApp({
  credential: admin.credential.cert(fbConfig),
});

// Create Express server
const app = express();

// Express configuration
app.use(logger("tiny"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3001);

app.use("/burger", burgerRoutes);

export default app;
