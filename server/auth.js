const crypto = require('crypto');
const storage = require('./storage');

function isRegisteredUser(login, password) {
  let userInDb = storage.getUser(login);
  if (!userInDb) return false;

  const hash = crypto.pbkdf2Sync(password, userInDb.salt, 1000, 512, 'sha512').toString('hex');
  return hash === userInDb.hash;
}

module.exports = {
  isRegisteredUser,
};
