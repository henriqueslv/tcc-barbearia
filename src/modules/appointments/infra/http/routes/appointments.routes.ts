import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ensureAutenticated from '../../../../../shared/infra/http/middlewares/ensureAutenticated';

const appointmentsRouter = Router();



appointmentsRouter.use(ensureAutenticated);

// Rota GET
//appointmentsRouter.get('/', async (request, response) => {
  //const appointments = await appointmentRepository.find();
  
  //return response.json(appointments);
//});

// Rota POST
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentRepository);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default appointmentsRouter;