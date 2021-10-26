import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentsController{
    public async create(request: Request, response: Response): Promise <Response>{
        try {
          const user_id = request.user.id;

          const { provider_id, date } = request.body;
        
          const parsedDate = parseISO(date);
        
          const appointmentRepository = new AppointmentsRepository();
          const createAppointment = new CreateAppointmentService(appointmentRepository);
        
          const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
            user_id,
          });
        
            return response.json(appointment);
          } catch (err) {
            return response.status(400).json({ Error: err.message });
          }
    }
}