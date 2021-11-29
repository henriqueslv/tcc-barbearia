import { Request, Response } from "express";
import { container } from 'tsyringe';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import ListProviderDayAvailabilityService from "../../../../../modules/appointments/services/ListProviderDayAvailabilityService";


export default class ProviderDayAvailabilityController{
    public async index(request: Request, response: Response): Promise <Response>{
    
            const {provider_id} = request.params;
            const {day, year, month} = request.query;

            const listProviderDayAvailabilityService = container.resolve(
                ListProviderDayAvailabilityService,
              );

            const availability = await listProviderDayAvailabilityService.execute({
                provider_id,
                day: Number(day),
                year: Number(year),
                month: Number(month),
            
            });

        return response.json(availability);
   
    }
}