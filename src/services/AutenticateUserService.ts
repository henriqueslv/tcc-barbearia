import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { sign } from 'jsonwebtoken';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

class AutenticateUserService{
    public async execute({email, password}: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if(!user){
            throw new Error("Dados incorretos.");    
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error("Dados incorretos.");    
        }

        const token = sign({}, '4a9e56f67b65cf6436d9c1dcf9e4bb45', {
            subject: user.id,
            expiresIn: '1d'
        });


        return{
            user,
            token,
        };
    }
} 

export default AutenticateUserService;