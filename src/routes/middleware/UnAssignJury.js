import {pool} from "./initializers/pgdb";
import {deleteEvaluation, studentSetEvaluationId} from "../../utils/query";

export const UnAssignJury = async(req, res, next) => {
  try {
    await pool.query(studentSetEvaluationId, [null, req.params.id]);
    await pool.query(deleteEvaluation, [res.locals.evaluationId]);
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}