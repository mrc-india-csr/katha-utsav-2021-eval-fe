import {pool} from "./initializers/pgdb";
import {
  countFictionStudentDetailsQueryBuilder,
  countNonFictionStudentDetailsQueryBuilder,
  countPoetryStudentDetailsQueryBuilder,
  countStudentDetailsQueryBuilder,
  fetchStudentDetailsQueryBuilder
} from "../../utils/query";

export const FetchStudentDetails = async (req, res, next) => {
  try {
    const queryResponse = await pool.query(fetchStudentDetailsQueryBuilder(req.body, res.locals.userData));

    const totalCount = (await pool.query(countStudentDetailsQueryBuilder(req.body, res.locals.userData))).rows[0].count;
    const fictionCount = (await pool.query(countFictionStudentDetailsQueryBuilder(req.body, res.locals.userData))).rows[0].count;
    const nonFictionCount = (await pool.query(countNonFictionStudentDetailsQueryBuilder(req.body, res.locals.userData))).rows[0].count;
    const poetryCount = (await pool.query(countPoetryStudentDetailsQueryBuilder(req.body, res.locals.userData))).rows[0].count;
    const currentDataSet = req.body.dataSet;
    const totalDataSet = Math.ceil(totalCount / 110);

    res.locals.responseObject = {
      totalCount,
      fictionCount,
      nonFictionCount,
      poetryCount,
      currentDataSet,
      totalDataSet,
      studentsList: queryResponse.rows
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}