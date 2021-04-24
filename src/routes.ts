import { Router } from "express";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const usersController = new UsersController();
const settingsController = new SettingsController();

const routes = Router();

routes.post('/users', usersController.create);

routes.post('/settings', settingsController.create);
routes.delete('/settings/:id', settingsController.remove)

export { routes };