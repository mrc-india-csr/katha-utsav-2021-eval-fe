import express from 'express'
import {validate} from 'express-validation';
import {loginValidationSchema, studentDetailsValidationSchema} from '../utils/helpers/validationHelpers';
import {ValidateLogin} from "./middleware/validateLogin";
import {FetchStudentDetails} from "./middleware/fetchStudentDetails";
import {ExtractJuryDetails} from "./middleware/extractJuryDetails";
import {UpdateDownloadUrl} from "./middleware/updateDownloadUrl";

const router = express.Router()

router.post('/login', validate(loginValidationSchema, {}, {}), ValidateLogin, (req, res) => {
  return res.status(200).json({redirect: '/dashboard'});
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({redirect: '/'});
})

router.get('/student_details', validate(studentDetailsValidationSchema, {}, {}), ExtractJuryDetails, FetchStudentDetails, UpdateDownloadUrl, (req, res) => {
  const currentPage = parseInt(req.body.page);
  const totalPages = Math.ceil(res.locals.totalStudentsCount / req.body.limit);
  const body = {
    totalCount: res.locals.totalStudentsCount,
    currentPage,
    totalPages,
    prevEnabled: currentPage > 1,
    nextEnabled: currentPage < totalPages,
    studentsList: res.locals.studentDetails
  }

  res.status(200).json(body);
});

export default router;
