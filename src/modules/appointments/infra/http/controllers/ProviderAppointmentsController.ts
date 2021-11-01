import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ListProviderAppointmentsService from "src/modules/appointments/services/ListProviderAppointmentsService";

export default class ProviderAppointmentsController{
    public async index(request: Request, response: Response): Promise <Response>{

          const provider_id = request.user.id;

          const {day, month, year } = request.body;
        
          const appointmentRepository = new AppointmentsRepository();
          const listProviderAppointments = new ListProviderAppointmentsService(appointmentRepository);
        
          const appointments = await listProviderAppointments.execute({
            provider_id,
            month,
            day,
            year
          });
        
            return response.json(appointments);
    }
}