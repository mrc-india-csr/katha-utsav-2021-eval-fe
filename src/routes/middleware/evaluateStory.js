import {pool} from "./initializers/pgdb";
import {evaluationSetResult} from "../../utils/query";

export const EvaluateStory = async (req, res, next) => {
  try {
    let action = 'IN REVIEW'

    if(req.params.action === '1') {
      action = 'APPROVED'
    } else if(req.params.action === '2'){
      action = 'DECLINED'
    }

    await pool.query(evaluationSetResult, [res.locals.evaluationId, action]);
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}