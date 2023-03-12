import express from "express";

import {
  getAllBurger,
  getBurger,
  createBurger,
  updateBurger,
  deleteBurger,
} from "./../controllers/burger";

const router = express.Router();

router.get("/", getAllBurger);
router.get("/:id", getBurger);
router.post("/", createBurger);
router.put("/:id", updateBurger);
router.delete("/:id", deleteBurger);

export default router;
