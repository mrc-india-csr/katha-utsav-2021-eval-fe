import express from 'express'
import {validate} from 'express-validation';
import {loginValidationSchema, studentDetailsValidationSchema} from '../utils/helpers/validationHelpers';
import {ValidateLogin} from "./middleware/validateLogin";
import {FetchStudentDetails} from "./middleware/fetchStudentDetails";
import {ExtractJuryDetails} from "./middleware/extractJuryDetails";
import {UpdateDownloadUrl} from "./middleware/updateDownloadUrl";
import {AssignJury} from "./middleware/assignJury";
import {VerifyAssign} from "./middleware/verifyAssign";
import {VerifyEvaluationJury} from "./middleware/verifyEvaluationJury";
import {UnAssignJury} from "./middleware/UnAssignJury";
import {EvaluateStory} from "./middleware/evaluateStory";

const router = express.Router()
router.use(express.json());
router.post('/login', validate(loginValidationSchema, {}, {}), ValidateLogin, (req, res) => {
  return res.status(200).json({redirect: '/dashboard'});
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({redirect: '/'});
})

router.post('/student_details', validate(studentDetailsValidationSchema, {}, {}), ExtractJuryDetails, FetchStudentDetails, UpdateDownloadUrl, (req, res) => {
  res.status(200).json(res.locals.responseObject);
});

router.post('/student_details/assign/:id', ExtractJuryDetails, VerifyAssign, AssignJury, (req, res) => {
  res.status(200).send('Action performed successfully!');
});

router.patch('/student_details/unassign/:id', ExtractJuryDetails, VerifyEvaluationJury, UnAssignJury, (req, res) => {
  res.status(200).send('Action performed successfully!');
});

router.patch('/student_details/action/:id/:action', ExtractJuryDetails, VerifyEvaluationJury, EvaluateStory, (req, res) => {
  res.status(200).send('Action performed successfully!');
});

export default router;
