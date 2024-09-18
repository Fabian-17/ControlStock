import { Router } from "express";
import { OrganizationController } from "../controllers/organizationController";
import { authenticateUser } from "../middlewares/authenticateUser";
import { authorizeRole } from "../middlewares/authorizeRole";
import { validator } from "../middlewares/validator";


const OrganizationRouter = Router();
const organizationController = new OrganizationController();
const middlewares = [authenticateUser, authorizeRole('user'), validator];

OrganizationRouter.get('/', ...middlewares, organizationController.getOrganizations);
OrganizationRouter.get('/:id', ...middlewares, organizationController.getOrganizationById);
OrganizationRouter.post('/', ...middlewares, organizationController.createOrganization);
OrganizationRouter.put('/:id', ...middlewares, organizationController.updateOrganization);
OrganizationRouter.delete('/:id', authenticateUser, authorizeRole('admin'), validator, organizationController.deleteOrganization);

export { OrganizationRouter };