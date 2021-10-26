import { Request, Response } from "express";
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import ListProviderMonthAvailabilityService from "src/modules/appointments/services/ListProviderMonthAvailabilityService";


export default class ProviderMonthAvailabilityController{
    public async index(request: Request, response: Response): Promise <Response>{

            const {provider_id} = request.params;
            const {month, year} = request.body;
            
            const appointmentsRepository = new AppointmentsRepository();

            const listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(appointmentsRepository);

        
            const availability = await listProviderMonthAvailabilityService.execute({
                provider_id,
                month,
                year,
            
            });

        return response.json(availability);

          
    }
}