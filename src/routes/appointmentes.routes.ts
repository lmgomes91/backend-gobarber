import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import CreateAppointmentService from '../services/CreateAppointmentService'
import AppoitmentsRepository from '../repositories/AppointmentsRepository'


const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  try {
    const appointmentsRepository = getCustomRepository(AppoitmentsRepository)
    const appointments = await appointmentsRepository.find()
    return response.json(appointments)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider
    })

    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default appointmentsRouter