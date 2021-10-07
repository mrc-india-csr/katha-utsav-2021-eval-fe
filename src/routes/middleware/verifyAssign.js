import {pool} from "./initializers/pgdb";
import {
  assignedCheckWithEvaluation,
  assignedCheckWithStudents
} from "../../utils/query";

export const VerifyAssign = async(req, res, next) => {
  try {
    const checkEvaluationExists = (await pool.query(assignedCheckWithEvaluation, [req.params.id])).rows[0].exists;
    const checkEvaluationId = (await pool.query(assignedCheckWithStudents, [req.params.id])).rows[0].evaluation_id;

    if(!checkEvaluationExists && checkEvaluationId === null) {
      next();
    } else {
      res.status(401).send('Student Already Assigned');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}