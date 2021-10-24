import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request{
    user_id: string;
}

class ShowProfileService{
    constructor(private usersRepository: IUsersRepository){}

    public async execute({ user_id}: Request): Promise<User>{

        const user = await this.usersRepository.findById(user_id);

        if (!user){
            throw new Error("Apenas usuários autorizados podem mudar o avatar");
        }

        return user;

}}

export default ShowProfileService;