import jwt from 'jsonwebtoken';
import config from '../../config';
import {pool} from "./initializers/pgdb";
import {loginQuery} from "../../utils/query";

const { jwtSecretKey } = config

export const CheckIfLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, jwtSecretKey, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          next();
        } else {
          const queryResponse = await pool.query(loginQuery, [decodedToken.email]);
          if (!(queryResponse.rows.length > 0) || !queryResponse.rows[0].jury_isActive) {
            res.clearCookie('jwt');
            next();
          } else {
            res.locals.userEmail = decodedToken.email;
            res.redirect('/dashboard');
          }
        }
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e)
    next();
  }
}