const { verify } = require('../utils/jwt-util');

module.exports = (req, res, next) => {
  const tokenId = req.headers['x-user-token'];
  let status = false;

  try {
    verify(tokenId);
    status = true;
  } catch (ignore) {
    // ignore
  }

  if (!status) {
    throw new Error('Access denied');
  }
  next();
};
