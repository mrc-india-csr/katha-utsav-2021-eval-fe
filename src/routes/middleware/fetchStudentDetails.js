import {pool} from "./initializers/pgdb";
import {fetchStudentDetailsQuery, fetchStudentDetailsQueryWithUnAssigned} from "../../utils/query";

export const FetchStudentDetails = async(req, res, next) => {
  try {
    const {email} = res.locals.userData;
    const {offset, assignedOnly} = req.body;
    const queryResponse = await pool.query(assignedOnly? fetchStudentDetailsQuery: fetchStudentDetailsQueryWithUnAssigned, [email, parseInt(offset)]);
    res.locals.studentDetails = queryResponse.rows;
    next();
  } catch(e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}