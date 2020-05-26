import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPassWordController = new ForgotPasswordController();
const resetPassWordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPassWordController.create);
passwordRouter.post('/reset', resetPassWordController.create);

export default passwordRouter;
