import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
    async create(request: Request, response: Response) {
        try {
            const { username, chat } = request.body;

            const settingsService = new SettingsService();

            const create = await settingsService.create({ username, chat });

            response.status(201).json(create);
        } catch (err) {
            response.status(400).json({ error: 'Failed to create a setting', errorDetail: err.message });
        }
    }

    async remove(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const settingsService = new SettingsService();

            await settingsService.remove(id);

            response.status(204).json({ message: 'Resource deleted successfully' });
        } catch (err) {
            response.status(400).json({ error: 'Failed to delete a setting', errorDetail: err.message });
        }
    }

    async findByUsername(request: Request, response: Response) {
        try {
            const { username } = request.params;

            const settingsService = new SettingsService();

            const setting = await settingsService.findByUserName(username);

            response.status(200).json(setting);
        } catch (err) {
            response.status(400).json({ error: 'Failed to get the user\'s setting!', errorDetail: err.message });
        }
    }

    async updateUserChat(request: Request, response: Response) {
        try {
            const { username } = request.params;
            const { chat } = request.body;

            const settingsService = new SettingsService();

            const setting = await settingsService.updateUserChat(username, chat);

            response.status(200).json(setting);
        } catch (err) {
            response.status(400).json({ error: 'Failed to update the user\'s setting!', errorDetail: err.message });
        }
    }
}

export { SettingsController }