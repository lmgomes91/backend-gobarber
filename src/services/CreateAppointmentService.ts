import Appointment from "../models/Appointment"
import AppointmenstRepository from '../repositories/AppointmentsRepository'

import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

interface Request {
  provider: string
  date: Date
}
/*
* dependecy inversion 
*/

class CreateAppointmentService {

  public async execute({ date, provider }: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmenstRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.
      findBydate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService