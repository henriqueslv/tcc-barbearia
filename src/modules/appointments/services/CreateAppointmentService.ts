import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface Request {
  provider_id: string;
  user_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ){}

  public async execute({ date, user_id, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())){
      throw new Error('Você não pode criar um agendamento em data passada');
    }

    if(user_id === provider_id){
      throw new Error('Você não pode criar um agendamento com você mesmo');
    }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
      throw new Error('Você só pode criar agendamento das 8:00 às 17:00');
    }
  
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
     throw Error('Este horário já está reservado.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });


    return appointment;
  }
}

export default CreateAppointmentService;