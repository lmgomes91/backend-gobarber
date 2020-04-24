import { Router, json } from 'express'

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import sessionsRoute from './sessions.routes'

const routes = Router()
routes.use(json())
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRoute)

export default routes
