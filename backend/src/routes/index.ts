import { Router } from "express";
import radio from "./radio.routes.js";
import refresh from "./refresh.routes.js";

const router = Router();

router.use("/radio", radio);
router.use("/refresh", refresh);

export default router;
