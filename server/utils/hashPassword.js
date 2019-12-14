const bcryptjs = require("bcryptjs");

exports.comparePassword = (reqPassword, dataBaseUserPassword) =>
  new Promise((resolve, reject) => {
    bcryptjs.compare(reqPassword, dataBaseUserPassword, (err, match) => {
      if (err) return reject(err);
      resolve(match);
    });
  });

exports.hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(12, (getErr, salt) => {
      if (getErr) return reject(getErr);
      bcryptjs.hash(password, salt, (saltErr, hash) => {
        if (saltErr) return reject(saltErr);
        resolve(hash);
      });
    });
  });
};
