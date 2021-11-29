import { hash } from 'bcryptjs';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    constructor(private usersRepository: IUsersRepository){}

    public async execute({name, email, password}: Request): Promise <User> {

        const CheckUserExists = await this.usersRepository.findByEmail(email);

        if (CheckUserExists){
            throw new Error('Email já utilizado.')
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        if(user){
            if(!user.avatar.startsWith('http')){
                user.avatar = 'http://localhost:3333/files/'+user.avatar
            }
        }
        return user;
    }
}

export default CreateUserService;