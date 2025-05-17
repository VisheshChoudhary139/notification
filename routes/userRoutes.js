import express from "express";
import { create, getAllUsers, getUserById, update } from "../controller/userController.js";

const router = express.Router();

router.post("/users", create);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", update);

export default router;
