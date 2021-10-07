import {pool} from "./initializers/pgdb";
import {unassignCheck} from "../../utils/query";

export const VerifyEvaluationJury = async(req, res, next) => {
  try {
    const statusRow = (await pool.query(unassignCheck, [req.params.id])).rows[0];
    if(statusRow.jury_id === res.locals.userData.juryId) {
      res.locals.evaluationId = statusRow.evaluation_id;
      next();
    } else {
      res.status(401).send('Unauthorized Operation!');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}