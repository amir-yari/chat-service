import { Router } from "express";
import { addMessage } from "../controllers/messagesControllers";

const router = Router();

router.post("/add-message", addMessage);

export default router;
