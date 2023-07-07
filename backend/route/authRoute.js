import express from "express";
import {
  signup,
  signin,
  test,
  forgotPassword,
} from "../controller/authController.js";
import { requireSignin, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/test", requireSignin, isAdmin, test);
router.patch("/forgot-password", forgotPassword);

router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).json({ ok: true });
});

router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
