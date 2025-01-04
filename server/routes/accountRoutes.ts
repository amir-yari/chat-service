import { Router } from "express";
import { getCurrentUser } from "../controllers/accountControllers";

const router = Router();

router.post("/", getCurrentUser);

export default router;
