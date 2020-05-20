import { Router, json } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRoute from '../../../../modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '../../../../modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();
routes.use(json());
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoute);

export default routes;
