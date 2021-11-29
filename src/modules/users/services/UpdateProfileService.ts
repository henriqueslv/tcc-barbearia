import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request{
    user_id: string;
    name: string;
    email: string;
    old_password: string;
    password: string;
}
@injectable()
class UpdateProfileService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,       
    ){}

    public async execute({ user_id, name, email, old_password, password}: Request): Promise<User>{

        const user = await this.usersRepository.findById(user_id);

        if (!user){
            throw new Error("Apenas usuários autorizados podem mudar o avatar");
            
        }

        const checkEmai = await this.usersRepository.findByEmail(email);

        if(checkEmai && checkEmai.id !== user_id){
            throw new Error ("Email já usado por outro usuário");
        }

        if(password && !old_password){
            throw new Error ("Informe a senha atual");
        }

        user.name = name;
        user.email = email;

        return this.usersRepository.save(user);

}}

export default UpdateProfileService;