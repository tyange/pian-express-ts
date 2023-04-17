import express from "express";

import {
  getAllBurger,
  getBurger,
  createBurger,
  updateBurger,
  deleteBurger,
  getAllBurgerPageCount,
  getMyBurgers,
} from "../controllers/burger";
import { verifyingToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", getAllBurger);
router.get("/counts", getAllBurgerPageCount);
router.get("/detail/:id", getBurger);
router.get("/my/:userId", verifyingToken, getMyBurgers);
router.post("/", verifyingToken, createBurger);
router.put("/:id", verifyingToken, updateBurger);
router.delete("/:id", verifyingToken, deleteBurger);

export default router;
