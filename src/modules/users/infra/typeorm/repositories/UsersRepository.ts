import {Repository} from 'typeorm'
import { getRepository } from 'typeorm';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository{
  private ormReposity: Repository<User>;

  constructor(){
    this.ormReposity = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.ormReposity.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormReposity.findOne({
        where: { email },
    });
    
    return user;
}


  public async create(userData: ICreateUserDTO): Promise<User>{
    const appointment = this.ormReposity.create(userData);

    await this.ormReposity.save(appointment);
    return appointment;
  }

  public async save(user: User): Promise<User>{
      return this.ormReposity.save(user);
  }

}

export default UsersRepository;