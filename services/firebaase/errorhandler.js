import * as errors from './errorcodes';

/**
 * returns the error text based on the errorcode
 * argument received from the firebase errors object.
 * @param {string} errorcode
 * @author Omar Aljazairy
 * @version 1.0
 */
export function getError(errorcode) {
  console.log('errorcode from received: ', errorcode);
  const error = errors.default;
  const errormsg = error[errorcode];
  console.log('error constant returned: ', errormsg);

  return errormsg;
}
