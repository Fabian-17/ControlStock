import { Router } from "express";
import { userRouter } from "./userRoutes";
import { equipmentRouter } from "./equipmentRoutes";
import { locationRouter } from "./locationRoutes";
import { OrganizationRouter } from "./organizationRoutes";

const router = Router();

router.use("/auth", userRouter);
router.use("/equipments", equipmentRouter);
router.use("/locations", locationRouter);
router.use("/organizations", OrganizationRouter);

export default router;