function hashPassword(password) {
  const bcrypt = require("bcrypt");
  const hashed = bcrypt.hashSync(password, 10);
  return hashed;
}

module.exports = hashPassword;
