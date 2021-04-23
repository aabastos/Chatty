import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {
    async create(request: Request, response: Response) {
        try {
            const { username, chat } = request.body;

            const settingsRepository = getCustomRepository(SettingsRepository);

            const settings = settingsRepository.create({
                chat,
                username
            });

            const create = await settingsRepository.save(settings);

            response.status(201).json(create);
        } catch (err) {
            response.status(400).json({ error: 'Failed to create a setting', errorDetail: err });
        }
    }

    async remove(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const settingsRepository = getCustomRepository(SettingsRepository);

            const setting = await settingsRepository.findOne({ id });
            await settingsRepository.remove(setting);

            response.status(204).json({ message: 'Resource deleted successfully' });
        } catch (err) {
            response.status(400).json({ error: 'Failed to delete a setting', errorDetail: err });
        }
    }
}

export { SettingsController }