import {pool} from '../../routes/middleware/initializers/pgdb';
import { pendingStatusCountQuery, evaluationStatusCountQuery } from '../../utils/query';

function statusCount(req, res, next) {
  async function getPendingStatus() {
    try{
      const pendingStatusQueryResponse = await pool.query(pendingStatusCountQuery);
      return pendingStatusQueryResponse.rows[0]['count'];
    }
    catch(error) {
      console.log(error);
    }
  }

  async function getApprovedStatus() {
    try{
      const approvedStatusQueryResponse = await pool.query(evaluationStatusCountQuery,['APPROVED']);
      return approvedStatusQueryResponse.rows[0]['count'];
    }
    catch(error) {
      console.log(error);
    }
  }

  async function getDeclinedStatus() {
    try{
      const declinedStatusQueryResponse = await pool.query(evaluationStatusCountQuery,['DECLINED']);
      return declinedStatusQueryResponse.rows[0]['count'];
    }
    catch(error) {
      console.log(error);
    }
  }

  (async () => {
    const pendingStatusResult = await getPendingStatus();
    const approvedStatusResult = await getApprovedStatus();
    const declinedStatusResult = await getDeclinedStatus();
    res.locals.pendingStatus = pendingStatusResult;
    res.locals.approvedStatus = approvedStatusResult;
    res.locals.declinedStatus = declinedStatusResult;

    next();
  }
  )();
}

module.exports = statusCount;
