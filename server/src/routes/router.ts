import indexCtrl from "@/controllers/indexCtrl";
import { Router } from "express";

const router = Router();

router.get("/", indexCtrl);

export default router;