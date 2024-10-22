import { Router } from "express";
import { addMessage } from "../controllers/messageControllers";

const router = Router();

router.post("/add-message", addMessage);

export default router;
