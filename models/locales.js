/**
 * The UserLocale object will contain all locale details
 * that is needed in this app.
 * @author Omar Aljazairy
 * @version 1.0
 */

class Locale {
  /**
   * @param {string} languageCode - default en
   * @param {string} timezone
   * @param {string} currency
   * @param {string} countryCode
   * @param {boolean} isRTL - default false
   */
  constructor(languageCode = 'en', countryCode, timezone, isRTL = false) {
    this.languageCode = languageCode;
    this.countryCode = countryCode;
    this.timezone = timezone;
    this.currency = this.setCurrency();
    this.isRTL = isRTL;
  }

  /**
   * @todo - find away to get the currency.
   */
  setCurrency() {
    return 'EUR';
  }
}

export default Locale;
