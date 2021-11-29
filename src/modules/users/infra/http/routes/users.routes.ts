import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import UserAvatarControler from '../controllers/UserAvatarControllers';
import ensureAutenticated from '../../../../../shared/infra/http/middlewares/ensureAutenticated';



const usersRouter = Router();
const usersController = new UsersController();
const userAvatarControler = new UserAvatarControler();
const upload = multer(uploadConfig.multer);


usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAutenticated,
  upload.single('avatar'),
  userAvatarControler.update,
);

export default usersRouter;