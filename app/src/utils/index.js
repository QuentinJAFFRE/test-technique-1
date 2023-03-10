import validator from "validator";
import { USER_ID_REGEXP } from "../constants";

export function getMonths(count = 20) {
  const arr = [];
  var d = new Date();
  for (let i = 0; i < count; i++) {
    arr.push(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - i, 1)));
  }
  return arr;
}

export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function validateUserIdFormat(userId) {
  if (validator.isEmpty(userId)) {
    return "This field is Required";
  }
  if (!validator.matches(userId, USER_ID_REGEXP)) {
    return "This field must be like : surname.name[id]";
  }
}

export function validatePassword(password) {
  if (validator.isEmpty(password)) {
    return "This field is Required";
  }
  if (!validator.isStrongPassword(password)) {
    return "The password must have a minimum length of 8 caracter, and must contain at least an uppercase letter, a number, and a special symbol.";
  }
}
