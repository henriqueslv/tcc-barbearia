import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAutenticated from '../middlewares/ensureAutenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';


const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch('/avatar', ensureAutenticated, upload.single('avatar'), async (request, response) => {
  try{
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json({ user });

  }catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default usersRouter;