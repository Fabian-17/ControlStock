import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateUser } from '../middlewares/authenticateUser';
import { authorizeRole } from "../middlewares/authorizeRole";
import { validator } from "../middlewares/validator";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/register", validator, userController.createUser);
userRouter.put("/:id", authenticateUser, authorizeRole('user'), validator, userController.updateUser);
userRouter.delete("/:id", authenticateUser, authorizeRole('admin'), userController.deleteUser);
userRouter.post("/login", userController.login);

export { userRouter };