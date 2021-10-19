import { Router } from 'express';
import AutenticateUserService from '../services/AutenticateUserService';

const sessionsRouter = Router();


// Rota POST
sessionsRouter.post('/', async (request, response) => {
  try {
      const {email, password} = request.body;

      const autenticateUser = new AutenticateUserService();

      const { user } = await autenticateUser.execute({
          email,
          password
      });

      delete user.password;
 
    return response.json({user});
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default sessionsRouter;