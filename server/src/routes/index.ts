import { Router } from "express";
import { userRouter } from "./userRoutes";
import { equipmentRouter } from "./equipmentRoutes";
import { locationRouter } from "./locationRoutes";

const router = Router();

router.use("/auth", userRouter);
router.use("/equipments", equipmentRouter);
router.use("/locations", locationRouter);

export default router;