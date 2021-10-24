import { Request, Response } from "express"
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';



export default class UserAvatarControler {
    public async update(request: Request, response: Response): Promise<Response>{
        try{
            const usersRepository = new UsersRepository();
            
            const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
        
            const user = await updateUserAvatar.execute({
              user_id: request.user.id,
              avatarFilename: request.file.filename,
            });
        
            delete user.password;
        
            return response.json({ user });
        
          }catch (err) {
            return response.status(400).json({ Error: err.message });
          }
    }
}