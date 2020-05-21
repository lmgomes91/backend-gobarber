import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateAppointmentDTO from '../../dtos/ICreateapointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppoitmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const finAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return finAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.provider_id = provider_id;
    appointment.date = date;
    appointment.id = uuid();

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppoitmentsRepository;
