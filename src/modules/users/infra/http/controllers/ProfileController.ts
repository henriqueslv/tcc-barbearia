import { Request, Response } from "express"
import UpdateProfileService from "../../../services/UpdateProfileService";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import ShowProfileService from "src/modules/users/services/ShowProfileService";


export default class ProfileControler {

    public async show(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const usersRepository = new UsersRepository();
        
        const showProfile = new ShowProfileService(usersRepository);

        const user = await showProfile.execute({user_id})

        delete user.password;

        return response.json(user);
    }

    
    public async update(request: Request, response: Response): Promise<Response>{
        try {
            const user_id = request.user.id;

            const {name, email, old_password, password} = request.body;

            const usersRepository = new UsersRepository();
        
            const updateProfile = new UpdateProfileService(usersRepository);
        
            const user = await updateProfile.execute({
                user_id,
                name,
                email,
                old_password,
                password,
            });
        
            return response.json(user);

          } catch (err) {
            return response.status(400).json({ Error: err.message });
          }
    }
}