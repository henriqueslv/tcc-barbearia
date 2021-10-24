import { Router } from 'express';
import ensureAutenticated from 'src/shared/infra/http/middlewares/ensureAutenticated';
import AppointmentController from '../controllers/AppointmentsController';


const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAutenticated);

// Rota POST
appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;