import { compare } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth'
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

class AutenticateUserService{
    constructor(private usersRepository: IUsersRepository){}

    public async execute({email, password}: Request): Promise<Response> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new Error("Dados incorretos.");    
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error("Dados incorretos.");    
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });


        return{
            user,
            token,
        };
    }
} 

export default AutenticateUserService;