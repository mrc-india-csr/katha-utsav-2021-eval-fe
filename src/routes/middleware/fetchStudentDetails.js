import {pool} from "./initializers/pgdb";
import {countStudentDetailsQueryBuilder, fetchStudentDetailsQueryBuilder} from "../../utils/query";

export const FetchStudentDetails = async (req, res, next) => {
  try {
    const queryResponse = await pool.query(fetchStudentDetailsQueryBuilder(req.body, res.locals.userData));
    const totalCount = await pool.query(countStudentDetailsQueryBuilder(req.body, res.locals.userData));

    res.locals.totalStudentsCount = totalCount.rows[0].count;
    res.locals.studentDetails = queryResponse.rows;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}