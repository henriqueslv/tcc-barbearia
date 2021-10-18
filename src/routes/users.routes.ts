import { Router } from 'express';

const usersRouter = Router();


// Rota POST
usersRouter.post('/', async (request, response) => {
  try {

    return response.send();
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default usersRouter;