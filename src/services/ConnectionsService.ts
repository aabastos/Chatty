import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    user_id: string;
    admin_id?: string;
    socket_id: string;
}

interface IConnectionUpdate {
    id: string;
    socket_id: string;
}

class ConnectionsService {
    private connectionsRepository: Repository<Connection>;

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ user_id, admin_id, socket_id }: IConnectionCreate) {
        const connection = this.connectionsRepository.create({
            user_id,
            admin_id,
            socket_id
        });

        const create = await this.connectionsRepository.save(connection);

        return create;
    }

    async updateSocketId({ id, socket_id }: IConnectionUpdate) {
        const connection = await this.connectionsRepository.update({ id }, { socket_id });

        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({ user_id });

        return connection;
    }

    async findBySocketId(socket_id: string) {
        const connection = await this.connectionsRepository.findOne({ socket_id });

        return connection;
    }

    async listWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ['user']
        });

        return connections;
    }
}

export { ConnectionsService };