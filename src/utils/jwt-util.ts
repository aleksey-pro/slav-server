import * as jwt from 'jsonwebtoken';

const secretToken = process.env.SECRET_JWT_TOKEN;

export const sign = (data = {}) => {
  const signed = jwt.sign(data, secretToken)
  return signed;
};
export const verify = (token: string) => jwt.verify(token, secretToken);