import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Setting>

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ username, chat }: ISettingsCreate) {
        const setting = await this.settingsRepository.findOne({ username });

        if (setting) throw new Error('User already exists');

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        const create = await this.settingsRepository.save(settings);

        return create;
    }

    async remove(id: string) {
        const setting = await this.settingsRepository.findOne({ id });
        await this.settingsRepository.remove(setting);

        return;
    }

    async findByUserName(username: string) {
        const setting = await this.settingsRepository.findOne({ username });

        return setting;
    }

    async updateUserChat(username: string, chat: boolean) {
        const setting = await this.settingsRepository.findOne({ username });

        setting.chat = chat;

        const updatedSetting = await this.settingsRepository.save(setting);

        return updatedSetting;
    }
}

export { SettingsService }