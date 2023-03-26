import express from "express";

import {
  getAllBurger,
  getBurger,
  createBurger,
  updateBurger,
  deleteBurger,
  getAllBurgerPageCount,
} from "../controllers/burger";

const router = express.Router();

router.get("/", getAllBurger);
router.get("/counts", getAllBurgerPageCount);
router.get("/:id", getBurger);
router.post("/", createBurger);
router.put("/:id", updateBurger);
router.delete("/:id", deleteBurger);

export default router;
