import { injectable, inject } from 'tsyringe';
import path from 'path';
import User from '../infra/typeorm/entities/User';
import fs from 'fs';
import uploadConfig from '../../../config/upload';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';


interface Request{
    user_id:string;
    avatarFilename: string | any;
}
@injectable()
class UpdateUserAvatarService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ){}

    public async execute({ user_id, avatarFilename}: Request): Promise<User>{

        const user = await this.usersRepository.findById(user_id);

        if (!user){
            throw new Error("Apenas usuários autorizados podem mudar o avatar");
        }

        if (user.avatar){
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);
        user.avatar = filename;

        await this.usersRepository.save(user); 

        if(user){
            if(!user.avatar.startsWith('http')){
                user.avatar = 'http://localhost:3333/files/'+user.avatar
            }
        }

        return user;
    }
}

export default UpdateUserAvatarService;