import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
interface IUserCreate {
    email: string
}
class UsersService {
    async create({ email }: IUserCreate) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ email });
        if (user) throw new Error('User already exists!');

        const newUser = usersRepository.create({ email });

        const create = await usersRepository.save(newUser);

        return create;
    }
}

export { UsersService };