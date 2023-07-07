import express from "express";

import {
  createCategory,
  updateCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
} from "../controller/categoryController.js";

import { requireSignin, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-category", requireSignin, isAdmin, createCategory);
router.patch("/update-category/:_id", requireSignin, isAdmin, updateCategory);
router.get("/get-all-category", getAllCategory);
router.get("/get-single-category/:slug", getSingleCategory);
router.delete("/delete-category/:_id", requireSignin, isAdmin, deleteCategory);

export default router;
