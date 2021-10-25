import { Router } from 'express';
import ensureAutenticated from 'src/shared/infra/http/middlewares/ensureAutenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAutenticated);

// Rota GET
providersRouter.get('/', providersController.index);

export default providersRouter;