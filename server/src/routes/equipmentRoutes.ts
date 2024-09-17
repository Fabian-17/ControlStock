import { Router } from "express";
import { EquipmentController } from "../controllers/equipmentController";
import { authenticateUser } from "../middlewares/authenticateUser";
import { authorizeRole } from "../middlewares/authorizeRole";
import { validator } from "../middlewares/validator";

const equipmentRouter = Router();

const equipmentController = new EquipmentController();
const middlewares = [authenticateUser, authorizeRole('user'), validator];

equipmentRouter.get("/", ...middlewares, equipmentController.getEquipments);

equipmentRouter.get("/:id", ...middlewares, equipmentController.getEquipmentById);

equipmentRouter.post("/", ...middlewares, equipmentController.createEquipment);

equipmentRouter.put("/:id", ...middlewares, equipmentController.updateEquipment);

equipmentRouter.delete("/:id", ...middlewares, equipmentController.deleteEquipment);

export { equipmentRouter };