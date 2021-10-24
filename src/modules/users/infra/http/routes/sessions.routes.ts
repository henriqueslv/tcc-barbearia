import { Router } from 'express';
import SessiosControler from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessiosControler();

// Rota POST
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;