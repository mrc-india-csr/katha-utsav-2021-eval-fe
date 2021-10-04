import jwt from 'jsonwebtoken';
const config = require('../../config');

const { jwtSecretKey, jwtValidity } = config

export const createJwtToken = (email, juryId, name) => {
  return jwt.sign({ email, juryId, name }, jwtSecretKey, {
    expiresIn: parseInt(jwtValidity),
  });
}
