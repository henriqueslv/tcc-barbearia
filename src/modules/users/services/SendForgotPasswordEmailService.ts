import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    email: string;
}

class SendForgotPasswordEmailService{
    constructor(private usersRepository: IUsersRepository){}

    public async execute({email}: Request): Promise <void> {

    
    }
}

export default SendForgotPasswordEmailService;