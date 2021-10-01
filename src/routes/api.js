import express from 'express'
import {validate} from 'express-validation';
import {loginValidationSchema} from '../utils/validationHelpers';
import {ValidateLogin} from "./middleware/validateLogin";
import {createJwtToken} from "../utils/helpers/jwtHelpers";

const router = express.Router()

router.post('/login', validate(loginValidationSchema, {}, {}), ValidateLogin, (req, res) => {
  return res.status(200).json({redirect: '/dashboard'});
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({redirect: '/'});
})

export default router;
