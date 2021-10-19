import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const sessionsRouter = Router();


// Rota POST
sessionsRouter.post('/', async (request, response) => {
  try {
 
    return response.json({ok: true});
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default sessionsRouter;