import { request, response, Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const usersRouter = Router();



// Rota POST
usersRouter.post('/', async (request, response) => {
  try {
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });


    return response.json(user);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAutenticated, async (request, response) => {
  return response.json({ok: true});
});

export default usersRouter;