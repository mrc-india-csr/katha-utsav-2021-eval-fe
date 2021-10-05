import jwt from "jsonwebtoken";
import config from "../../config";

const { jwtSecretKey } = config;

export const ExtractJuryDetails = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, jwtSecretKey, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(401).send('Unauthorised');
        } else {
          res.locals.userData = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).send('Unauthorised');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}