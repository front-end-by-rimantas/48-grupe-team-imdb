import express from "express";
import { getHelpInfo } from "../controllers/help-controller.js";

const router = express.Router();

router.get("/", getHelpInfo);

export default router;
