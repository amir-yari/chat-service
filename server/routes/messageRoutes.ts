import { Router } from "express";
import { addMessage } from "../controllers/messageControllers";

const router = Router();

router.post("/", addMessage);

export default router;
