import {Repository} from 'typeorm'
import { getRepository } from 'typeorm';
import IAppointmentsRepository from 'src/modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from 'src/modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository{
  private ormReposity: Repository<Appointment>;

  constructor(){
    this.ormReposity = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormReposity.findOne({
      where: {date},
    });
    
    return findAppointment;
  }

  public async create({provider_id, date,}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormReposity.create({provider_id, date});

    await this.ormReposity.save(appointment);
  }

}

export default AppointmentsRepository;