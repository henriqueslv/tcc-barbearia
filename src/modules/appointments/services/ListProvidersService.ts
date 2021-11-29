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


        users.forEach(user => {
            if(user){
                if(!user.avatar.startsWith('http')){
                    user.avatar = 'http://localhost:3333/files/'+user.avatar
                }
            }
        });

        return users;
    }
}

export default ListProviderService;