import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAutenticated from 'src/shared/infra/http/middlewares/ensureAutenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAutenticated);

// appointmentsRouter.post(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       provider_id: Joi.string().uuid().required(),
//       date: Joi.date(),
//     },
//   }),
//   appointmentsController.create,
// );

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;