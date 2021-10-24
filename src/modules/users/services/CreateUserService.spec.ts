import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from "./CreateUserService";

describe('Criar usuario', () =>{
    it('Deve ser permitido criar um novo usuario', async ()=>{
        const fakeUsersRepository = new FakeUsersRepository();
        const createUsersService = new CreateUsersService(fakeUsersRepository,);

        const user = await createUsersService.execute({
           name: 'Henrique',
           email: 'henrique123@teste.com',
           password: '123',
        });

        expect(user).toHaveProperty('id');

        });

            it('Nao deve ser permitido criar dois usuarios no mesmo email', async ()=>{
                const fakeUsersRepository = new FakeUsersRepository();
                const createUser = new CreateUsersService(fakeUsersRepository);
        
                await createUser.execute({
                   name: 'Henrique',
                   email: 'henrique123@teste.com',
                   password: '123',
                });
        
                expect(createUser.execute({
                    name: 'Henrique',
                    email: 'henrique123@teste.com',
                    password: '123',
                 })).rejects.toBeInstanceOf(Error);
         });
});