import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request{
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;



class ListProviderDayAvailabilityService{
    constructor(private appointmentsRepository: IAppointmentsRepository){}

    public async execute({ provider_id, day, month, year }: Request): Promise<IResponse>{ 
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            day,
            year,
            month,
        });
        
        const hourStart = 8;
        
        const eachHourArray = Array.from({ length: 10}, (value , index) => index + hourStart,); 

        const currentDate = new Date(Date.now());

        const availability = eachHourArray.map(hour =>{
            const hasAppointmentInHour = appointments.find(appointment => getHours(appointment.date) === hour,);

            return{
                hour,
                available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
            };
        });
    
        return availability;
    }
}

export default ListProviderDayAvailabilityService;