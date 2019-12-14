const crypto = require("crypto");

exports.createHash = () => crypto.randomBytes(32).toString("hex");

exports.passwordResetToken = hash => {
  return crypto
    .createHash("sha256")
    .update(hash)
    .digest("hex");
};
