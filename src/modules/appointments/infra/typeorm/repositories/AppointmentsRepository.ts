import {Repository, getRepository, Raw} from 'typeorm'
import IAppointmentsRepository from 'src/modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from 'src/modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from 'src/modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from 'src/modules/appointments/dtos/IFindAllInDayFromProviderDTO';


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

  public async findAllInMonthFromProvider({provider_id, year, month}: IFindAllInMonthFromProviderDTO): Promise <Appointment[]> {
    const parseMonth = String(month).padStart(2, '0');
    const appointments = await this.ormReposity.find({
      where: {
        provider_id,
        date: Raw(dateFieldname => `to_char(${dateFieldname}, 'MM-YYYY') = '${parseMonth}-${year}'`),
      },
    });

    return appointments;

  }

  public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO): Promise <Appointment[]> {
    
    const parseDay = String(day).padStart(2, '0');
    const parseMonth = String(month).padStart(2, '0');
    
    const appointments = await this.ormReposity.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => `to_char(${dateFieldName},'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`),
      },

      relations: ['user'],
    });

    return appointments;

  }


  public async create({provider_id, user_id, date,}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormReposity.create({provider_id, user_id, date});

    await this.ormReposity.save(appointment);

    return appointment;
  }


}

export default AppointmentsRepository;