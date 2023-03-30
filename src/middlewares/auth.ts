import { Handler } from "express";
import admin from "firebase-admin";

export const verifyingToken: Handler = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    await admin.auth().verifyIdToken(token);

    next();
  } catch (err) {
    console.log(err);
    res.status(403);
    return res.json({
      error: "Cannot create bugger for unauthenticated users.",
    });
  }
};
