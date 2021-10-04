import jwt from 'jsonwebtoken';
import config from '../../config';
import {pool} from "./initializers/pgdb";
import {loginQuery} from "../../utils/query";

const { jwtSecretKey } = config

export const VerifyLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, jwtSecretKey, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          const queryResponse = await pool.query(loginQuery, [decodedToken.email]);
          if (!(queryResponse.rows.length > 0) || !queryResponse.rows[0].isActive) {
            res.clearCookie('jwt');
            res.redirect('/login');
          } else {
            res.locals.userEmail = decodedToken.email;
            next();
          }
        }
      });
    } else {
      res.redirect('/login');
    }
  } catch (e) {
    console.log(e)
    res.redirect('/login');
  }
}