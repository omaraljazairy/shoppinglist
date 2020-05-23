/**
 * valid email address
 * @param {string} val - input
 * @returns boolean
 */
export function email(val) {
  console.log('emailInputChange val: ', val);
  var format = /\S+@\S+\.\S+/;
  if (format.test(val)) {
    return true;
  } else {
    return false;
  }
}

/**
 * validate the firebase password.
 * @param {string} val
 * @returns boolean
 */
export function firebasePassword(val) {
  console.log('passwordInputChange val: ', val.length);
  if (val.lenght !== 0) {
    return true;
  } else {
    return false;
  }
}
