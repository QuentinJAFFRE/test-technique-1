const passwordValidator = require("password-validator");
const AWS = require("aws-sdk");

function validatePassword(password) {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum length 6
    .is()
    .max(100); // Maximum length 100

  return schema.validate(password);
}

function validateEmailFormat(email) {
  const emailRegexp =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  return emailRegexp.test(email)
}

module.exports = {
  validatePassword,
  validateEmailFormat,
};
