import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request{
    provider_id: string;
    day: number,
    month: number;
    year: number;
}



class ListProviderAppointmentsService{
    constructor(private appointmentsRepository: IAppointmentsRepository){}

    public async execute({ provider_id, month, year, day }: Request): Promise<Appointment[]>{ 
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            year,
            month,
            day,
        })
        
        return appointments;
    }
}

export default ListProviderAppointmentsService;