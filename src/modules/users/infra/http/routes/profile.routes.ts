import { Router } from 'express';
import ProfileControler from '../controllers/ProfileController';
import ensureAutenticated from '../../../../../shared/infra/http/middlewares/ensureAutenticated';



const profileRouter = Router();
const profileControler = new ProfileControler();

profileRouter.use(ensureAutenticated);

profileRouter.get('/', profileControler.show);
profileRouter.put('/', profileControler.update);


export default profileRouter;