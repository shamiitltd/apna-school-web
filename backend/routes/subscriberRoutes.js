import express from "express";

import { subscriberNewsletter } from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/", subscriberNewsletter);

export default router;
