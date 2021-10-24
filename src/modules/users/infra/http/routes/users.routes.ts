import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UsersControler from '../controllers/UsersController';
import UserAvatarControler from '../controllers/UserAvatarControllers';
import ensureAutenticated from '../../../../../shared/infra/http/middlewares/ensureAutenticated';



const usersRouter = Router();
const usersControler = new UsersControler();
const userAvatarControler = new UserAvatarControler();
const upload = multer(uploadConfig);


usersRouter.post('/', usersControler.create);

usersRouter.patch('/avatar', ensureAutenticated, upload.single('avatar'), userAvatarControler.update,);

export default usersRouter;