import { Router } from "express";
import { registerUserController } from "../../controller/user-register.js";

const router = Router();

router.post("/register", registerUserController);

export default router;