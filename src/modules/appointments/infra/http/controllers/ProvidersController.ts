import { Request, Response } from "express";
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import ListProvidersService from '../../../services/ListProvidersService';
import UsersRepository from "../../../../../../src/modules/users/infra/typeorm/repositories/UsersRepository";


export default class ProviderController{
    public async index(request: Request, response: Response): Promise <Response>{

            const user_id = request.user.id;
            
            const usersRepository = new UsersRepository();

            const listProviders = new ListProvidersService(usersRepository);

        
            const providers = await listProviders.execute({user_id});

        return response.json(providers);

          
    }
}