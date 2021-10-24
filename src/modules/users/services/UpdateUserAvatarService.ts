import path from 'path';
import User from '../infra/typeorm/entities/User';
import fs from 'fs';
import uploadConfig from '../../../config/upload';
import IUsersRepository from '../repositories/IUsersRepository';


interface Request{
    user_id:string;
    avatarFilename: string;
}

class UpdateUserAvatarService{
    constructor(private usersRepository: IUsersRepository){}

    public async execute({ user_id, avatarFilename}: Request): Promise<User>{

        const user = await this.usersRepository.findById(user_id);

        if (!user){
            throw new Error("Apenas usuários autorizados podem mudar o avatar");
            
        }

        if ( user.avatar){

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user); 

        return user;
    }
}

export default UpdateUserAvatarService;