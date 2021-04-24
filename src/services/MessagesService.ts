import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IMessageCreate {
    admin_id?: string;
    user_id: string;
    sender_id: string;
    text: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }
    async create({ admin_id, user_id, sender_id, text }: IMessageCreate) {
        const message = this.messagesRepository.create({
            admin_id,
            user_id,
            sender_id,
            text
        });

        const create = await this.messagesRepository.save(message);

        return create;
    }

    async showByUser(user_id: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ id: user_id });
        if (!user) throw new Error('User not exists');

        const messages = await this.messagesRepository.find({
            where: { user_id },
            relations: ['user'],
        });

        return messages;
    }
}

export { MessagesService };