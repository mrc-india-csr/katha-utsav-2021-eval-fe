import jwt from 'jsonwebtoken';
const config = require('../../config');

const { jwtSecretKey, jwtValidity } = config

export const createJwtToken = (email) => {
  return jwt.sign({ email }, jwtSecretKey, {
    expiresIn: parseInt(jwtValidity),
  });
}
