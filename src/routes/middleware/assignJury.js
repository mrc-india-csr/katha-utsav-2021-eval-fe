import {pool} from "./initializers/pgdb";
import {assignNewEvaluation, studentSetEvaluationId} from "../../utils/query";

export const AssignJury = async (req, res, next) => {
  try{
    const newEvaluationId = (await pool.query(assignNewEvaluation, [req.params.id, res.locals.userData.juryId])).rows[0].evaluation_id;
    const studentEvaluation = await pool.query(studentSetEvaluationId, [newEvaluationId, req.params.id]);

    if(studentEvaluation.rowCount === 1) {
      res.locals.newevaluationId = newEvaluationId;
      next();
    } else {
      res.status(500).send('Something went wrong');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}