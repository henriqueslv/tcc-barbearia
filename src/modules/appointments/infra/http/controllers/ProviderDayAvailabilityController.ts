import { Request, Response } from "express";
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import ListProviderDayAvailabilityService from "src/modules/appointments/services/ListProviderDayAvailabilityService";


export default class ProviderDayAvailabilityController{
    public async index(request: Request, response: Response): Promise <Response>{
    
            const {provider_id} = request.params;
            const {day, month, year} = request.body;
            
            const appointmentsRepository = new AppointmentsRepository();

            const listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(appointmentsRepository);

            const availability = await listProviderDayAvailabilityService.execute({
                provider_id,
                day,
                month,
                year,
            
            });

        return response.json(availability);

          
    }
}