const { verify } = require('../utils/jwt-util');

module.exports = (forRole) => {
  return (req, res, next) => {
    const tokenId = req.headers['x-user-token'];
    let status = false;
  
    try {
      const loggingUser = verify(tokenId);
      const { role } = loggingUser;

      if (forRole && forRole !== role) {
        throw new Error('Access denied');
      }
      
      status = true;
  
    } catch (ignore) {
      // ignore
    }
  
    if (!status) {
      throw new Error('Access denied');
    }
    next();
  };
}

