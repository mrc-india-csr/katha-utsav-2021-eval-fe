import {loginQuery} from "../../utils/query";
import {pool} from "./initializers/pgdb";
import {createJwtToken} from "../../utils/helpers/jwtHelpers";
import  config from '../../config';

const { jwtValidity } = config

export const ValidateLogin = async (req, res, next) => {
  try {
    const {email} = req.body;
    const queryResponse = await pool.query(loginQuery, [email]);
    if (!(queryResponse.rows.length > 0)) {
      res.status(401).send('Login failed, Invalid Email id.');
    } else if(!queryResponse.rows[0].jury_isActive) {
      res.status(401).send('Login failed, Your access has been blocked.');
    } else {
      res.cookie('jwt', createJwtToken(email, queryResponse.rows[0].jury_id, queryResponse.rows[0].jury_name), {
        sameSite: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(jwtValidity) * 1000,
      });
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong, Try Again!');
  }
};