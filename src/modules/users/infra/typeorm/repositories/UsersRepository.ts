import {getRepository, Not, Repository} from 'typeorm'
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from 'src/modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';
class UsersRepository implements IUsersRepository{
  private ormReposity: Repository<User>;

  constructor(){
    this.ormReposity = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.ormReposity.findOne(id);
    if(user){
      if(!user.avatar.startsWith('http')){
          user.avatar = 'http://localhost:3333/files/'+user.avatar
      }
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormReposity.findOne({
        where: { email },
    });
    if(user){
      if(!user.avatar.startsWith('http')){
          user.avatar = 'http://localhost:3333/files/'+user.avatar
      }
    }
    return user;
}

public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]>{
  let users: User[];

  if (except_user_id){
     users = await this.ormReposity.find({
      where: {
        id: Not(except_user_id),
      },
    });
  }else{
     users = await this.ormReposity.find();
  }

  users.forEach(user => {
    if(user){
      if(!user.avatar.startsWith('http')){
          user.avatar = 'http://localhost:3333/files/'+user.avatar
      }
    }
  });

  return users;

}

  public async create(userData: ICreateUserDTO): Promise<User>{
    const user = this.ormReposity.create(userData);

    await this.ormReposity.save(user);
    if(user){
      if(!user.avatar.startsWith('http')){
          user.avatar = 'http://localhost:3333/files/'+user.avatar
      }
    }
    return user;
  }

  public async save(user: User): Promise<User>{
      return this.ormReposity.save(user);
  }

}

export default UsersRepository;