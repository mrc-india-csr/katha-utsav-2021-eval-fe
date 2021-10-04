import jwt from 'jsonwebtoken';
const config = require('../../config');

const { jwtSecretKey, jwtValidity } = config

export const createJwtToken = (email, juryId) => {
  return jwt.sign({ email, juryId }, jwtSecretKey, {
    expiresIn: parseInt(jwtValidity),
  });
}
