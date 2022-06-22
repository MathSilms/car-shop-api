import { Router } from "express";
import { router } from ".";

const usersRoutes = Router();

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";


const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes }

