import { Request, Response } from "express";
import { ConnectionsService } from "../services/ConnectionsService";

class ConnectionsController {
    async create(request: Request, response: Response) {
        try {
            const { user_id, admin_id, socket_id } = request.body;

            const connectionsService = new ConnectionsService();

            const connection = await connectionsService.create({
                user_id,
                admin_id,
                socket_id
            });

            response.status(201).json(connection);
        } catch (err) {
            response.status(400).json({ error: 'Failed to create a connection', errorDetail: err.message });
        }
    }
}

export { ConnectionsController };