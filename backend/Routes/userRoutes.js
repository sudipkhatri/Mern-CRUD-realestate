import express from "express";
import { getAllUsers, login, signUp } from "../Controller/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/all", getAllUsers);

export default router;