const crypto = require('crypto');
const password = process.env.CYPHER_SECRET;

module.exports = {
  encrypt (id) {
    const cipher = crypto.createCipher('aes128', password);
    let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },
  decrypt(cypher) {
    const decipher = crypto.createDecipher('aes128', password);
    let decrypted = decipher.update(cypher,'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
