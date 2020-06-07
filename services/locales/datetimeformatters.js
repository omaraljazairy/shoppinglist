/* eslint-disable radix */
/**
 * special helper for any date or time function
 * needed in the app. Contains a default options
 * object for the format of the datetime functions.
 * @author Omar Aljazairy
 * @version 1.0
 * @public
 */

import moment from 'moment';

/**
 *
 * @param {string} datetime - datetime in format of miliseconds, example 1585853037822
 * @param {string:} locale - locale to be used in the formatter. default en-US.
 * @returns locale datetime string
 */
export function getLocaleDateTime(datetime, locale = 'en') {
  // convert the datetime string to an int and pass it to the Date object to be back a Date
  // const dateObject = new Date(parseInt(datetime));
  const dateObject = new Date(datetime);

  // format the dateObject to a string using the locale passed with the options object.
  var myeslocal = locale === 'es' ? require('moment/locale/es') : locale;
  moment.updateLocale(locale, myeslocal); // set locale
  console.log('localeLocale LLLL: ', moment(dateObject).format('LLLL'));

  return moment(dateObject).format('LLLL');
}
