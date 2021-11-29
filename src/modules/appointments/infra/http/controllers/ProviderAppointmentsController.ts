import { Request, Response } from "express";
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListProviderAppointmentsService from "../../../../../modules/appointments/services/ListProviderAppointmentsService";

export default class ProviderAppointmentsController{
    public async index(request: Request, response: Response): Promise <Response>{

          const provider_id = request.user.id;

          const {day, month, year } = request.query;
        
          const appointmentRepository = new AppointmentsRepository();
          const listProviderAppointments = new ListProviderAppointmentsService(appointmentRepository);
        
          const appointments = await listProviderAppointments.execute({
            provider_id,
            day: Number(day),
            year: Number(year),
            month: Number(month),
          });
        
            return response.json(appointments);
    }
}