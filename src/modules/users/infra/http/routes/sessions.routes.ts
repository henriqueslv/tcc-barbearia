import { Router } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import AutenticateUserService from '../../../services/AutenticateUserService';

const sessionsRouter = Router();


// Rota POST
sessionsRouter.post('/', async (request, response) => {
  try {
      const {email, password} = request.body;
      
      const usersRepository = new UsersRepository();

      const autenticateUser = new AutenticateUserService(usersRepository);

      const { user, token } = await autenticateUser.execute({
          email,
          password
      });

      delete user.password;
 
    return response.json({user, token});
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default sessionsRouter;