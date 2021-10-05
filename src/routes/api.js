import express from 'express'
import {validate} from 'express-validation';
import {loginValidationSchema, studentDetailsValidationSchema} from '../utils/helpers/validationHelpers';
import {ValidateLogin} from "./middleware/validateLogin";
import {FetchStudentDetails} from "./middleware/fetchStudentDetails";
import {ExtractJuryDetails} from "./middleware/extractJuryDetails";
import config from "../config";

const router = express.Router()

router.post('/login', validate(loginValidationSchema, {}, {}), ValidateLogin, (req, res) => {
  return res.status(200).json({redirect: '/dashboard'});
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({redirect: '/'});
})

router.get('/student_details', validate(studentDetailsValidationSchema, {}, {}), ExtractJuryDetails, FetchStudentDetails, (req, res) => {
  res.status(200).json(res.locals.studentDetails);
});

router.get('/download_story/:path', (req, res, next) => {
  const { s3Folder } = config
  console.log(s3Folder + req.params.path);
  res.status(200).send('success');
});

export default router;
