import { Request, Response } from "express"
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import CreateUserService from '../../../services/CreateUserService';


export default class UsersControler {
    public async create(request: Request, response: Response): Promise<Response>{
        try {
            const {name, email, password} = request.body;
        
            const usersRepository = new UsersRepository();
        
            const createUser = new CreateUserService(usersRepository);
        
            const user = await createUser.execute({
                name,
                email,
                password,
            });
        
        
            return response.json(user);
          } catch (err) {
            return response.status(400).json({ Error: err.message });
          }
    }
}