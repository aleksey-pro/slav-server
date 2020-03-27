const jwt = require('jsonwebtoken');

const secretToken = process.env.SECRET_JWT_TOKEN;

const sign = (data = {}) => {
  const signed = jwt.sign(data, secretToken)
  return signed;
};
const verify = (token = '') => jwt.verify(token, secretToken);

module.exports = {
  sign,
  verify,
};
