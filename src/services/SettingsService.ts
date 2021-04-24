import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    async create({ username, chat }: ISettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const setting = await settingsRepository.findOne({ username });

        if (setting) throw new Error('User already exists');

        const settings = settingsRepository.create({
            chat,
            username
        });

        const create = await settingsRepository.save(settings);

        return create;
    }

    async remove(id: string) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const setting = await settingsRepository.findOne({ id });
        await settingsRepository.remove(setting);

        return;
    }
}

export { SettingsService }