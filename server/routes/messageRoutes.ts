import { Router } from "express";
import { addMessage } from "../controllers/messageControllers";

const router = Router();

router.get("/");
router.post("/", addMessage);
router.get("/:sessionId");
router.post("/:sessionId", addMessage);

export default router;
