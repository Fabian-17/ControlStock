import { Router } from "express";
import { LocationController } from "../controllers/locationController";
import { authenticateUser } from "../middlewares/authenticateUser";
import { authorizeRole } from "../middlewares/authorizeRole";
import { validator } from "../middlewares/validator";

const locationRouter = Router();

const locationController = new LocationController();

const middlewares = [authenticateUser, authorizeRole('user'), validator];

locationRouter.get("/", ...middlewares, locationController.getLocationsWithStock);

locationRouter.get("/:id", ...middlewares, locationController.getLocationById);

locationRouter.post("/", ...middlewares, locationController.createLocation);

locationRouter.put("/:id", ...middlewares, locationController.updateLocation);

locationRouter.delete("/:id", authenticateUser, authorizeRole('admin'), validator, locationController.deleteLocation);

export { locationRouter };