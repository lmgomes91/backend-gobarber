import { Router } from 'express';

// import uploadConfig from '../../../../../config/upload';

import ensureAthenticated from '../middlewares/ensureAthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAthenticated);
profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
