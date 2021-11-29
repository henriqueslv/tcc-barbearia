import { Request, Response } from "express"
import { container } from 'tsyringe';
// import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarControler {
    public async update(request: Request, response: Response): Promise<Response>{
        try{
            // const usersRepository = new UsersRepository();
            
            const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        
            const user = await updateUserAvatar.execute({
              user_id: request.user.id,
              avatarFilename: request.file?.filename,
            });
        
            return response.json(classToClass(user));
        
          }catch (err: any) {
            return response.status(400).json({ Error: err.message });
          }
    }
}