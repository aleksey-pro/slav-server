const crypto = require('crypto');
const { sign } = require('../utils/jwt-util');
const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const role = email.split('@')[0];

  const hash = crypto.createHash('sha256');
  const hashPassword = hash.update(password).digest('hex');

  UserModel
    .findOne({ email })
    .then(user => {
      if (user.password !== hashPassword) {
        res.send({ error: true });
      }
      const token = sign(
        {
          id: user._id,
          email,
          role,
        }
      );
      res.send({ token });
    })
    .catch(next);
};
