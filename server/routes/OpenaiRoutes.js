import express from "express";
import { OpenaiController } from "../services/OpenaiController.js";

const router = express.Router();

router.post("/generateimages", OpenaiController);

export default router;
