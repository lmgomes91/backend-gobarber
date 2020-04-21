import { Router, json } from 'express'

import appointmentsRouter from './appointmentes.routes'

const routes = Router()
routes.use(json())
routes.use('/appointments', appointmentsRouter)

export default routes
