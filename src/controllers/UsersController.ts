import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {
    async create(request: Request, response: Response) {
        try {
            const { email } = request.body;

            const usersController = new UsersService();

            const user = await usersController.create({ email });

            response.status(201).json(user);
        } catch (err) {
            response.status(400).json({ error: 'Failed to create user', errorDetail: err.message });
        }
    }

}

export { UsersController };