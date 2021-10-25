import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import User from '../../users/infra/typeorm/entities/User'

interface Request{
    user_id: string;
}

class ListProviderService{
    constructor(private usersRepository: IUsersRepository){}

    public async execute({ user_id }: Request): Promise<User[]>{

        const users = await this.usersRepository.findAllProviders({
            except_user_id: user_id,
        });

        return users;
    }
}

export default ListProviderService;