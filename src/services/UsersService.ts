import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
interface IUserCreate {
    email: string
}
class UsersService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create({ email }: IUserCreate) {
        const user = await this.usersRepository.findOne({ email });
        if (user) throw new Error('User already exists!');

        const newUser = this.usersRepository.create({ email });

        const create = await this.usersRepository.save(newUser);

        return create;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });

        return user;
    }
}

export { UsersService };