/**
 * special helper for the translations of the app
 * it has the translate function which returns back
 * a translated text.
 * use the i18n library to set the locale language.
 * also using the react-native-localize library
 * to get more info about the country and currency.
 * @author Omar Aljazairy
 * @version 1.0
 * @public
 */

import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './languages/en.json';
import es from './languages/es.json';
import nl from './languages/nl.json';

i18n.translations = {
  en,
  es,
  nl,
};

// set the language
// i18n.locale = 'es';
i18n.defaultLocale = 'en';

/**
 * @param {string} text - the text should match the key in
 * the json language file and returns it's translation.
 * @returns translation string.
 */
export function translate(text) {
  // console.log('text received to be translated: ', text);
  const translation = i18n.t(text);
  // const country = RNLocalize.getCountry();
  // const currency = RNLocalize.getCurrencies();
  // const timezone = RNLocalize.getTimeZone();
  // const locale = RNLocalize.getLocales();
  // console.log('translation: ', translation);
  // console.log('getCountry: ', country);
  // console.log('getCurrency: ', currency);
  // console.log('getTimeZone: ', timezone);
  // console.log('getTimeZone: ', locale);
  return translation;
}
