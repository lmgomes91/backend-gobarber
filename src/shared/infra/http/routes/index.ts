import { Router, json } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRoute from '../../../../modules/users/infra/http/routes/sessions.routes';
import passwordRoute from '../../../../modules/users/infra/http/routes/password.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import appointmentsRouter from '../../../../modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();
routes.use(json());
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoute);
routes.use('/password', passwordRoute);
routes.use('/profile', profileRouter);

export default routes;
