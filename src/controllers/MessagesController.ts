import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
    async create(request: Request, response: Response) {
        try {
            const { admin_id, user_id, sender_id, text } = request.body;

            const messagesService = new MessagesService();

            const message = await messagesService.create({ admin_id, user_id, sender_id, text });

            response.status(201).json(message);
        } catch (err) {
            response.status(400).json({ error: 'Failed to create message', errorDetail: err.message });
        }
    }

    async showByUser(request: Request, response: Response) {
        try {
            const { user_id } = request.params;

            const messagesService = new MessagesService();

            const messages = await messagesService.showByUser(user_id);

            return response.status(200).json(messages);
        } catch (err) {
            response.status(400).json({ error: 'Failed to get message', errorDetail: err.message });
        }
    }
}

export { MessagesController };