import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const usersController = new UsersController();
const settingsController = new SettingsController();
const messagesController = new MessagesController();

const routes = Router();

routes.post('/users', usersController.create);

routes.post('/settings', settingsController.create);
routes.delete('/settings/:id', settingsController.remove);

routes.get('/messages/:user_id', messagesController.showByUser);
routes.post('/messages', messagesController.create);

export { routes };