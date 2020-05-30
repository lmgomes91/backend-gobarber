import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateAppointmentDTO from '../../dtos/ICreateapointmentDTO';
import IFindAllInMonthProviderDTO from '../../dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '../../dtos/IFindAllInDayProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppoitmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const finAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return finAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    date,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.provider_id = provider_id;
    appointment.date = date;
    appointment.id = uuid();
    appointment.user_id = user_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppoitmentsRepository;
