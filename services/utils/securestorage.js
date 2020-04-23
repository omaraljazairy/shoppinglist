import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

/**
 * stores the user apps preferences into the userDefaults of the OS.
 * this works with IOS and Android OS.
 * @author Omar Aljazairy
 * @version 1.0
 */

/**
 * stores a singe key/value preference to the user defaults
 * @param {string} key - key of the preference to be stored.
 * @param {string} value - value of the preference to be stored.
 */
export async function setStorage(key, value) {
  RNSecureStorage.set(key, value, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then(res => {
      console.log('key: ', key, ' & value: ', value, ' stored');
      console.log('res: ', res);
    })
    .catch(error => {
      console.log('error storing data: ', error);
    });
}

/**
 * deletes a stored values based on the key parameter provided.
 * @param {sring} key - the stored key preference.
 */
export async function deleteStorage(key) {
  RNSecureStorage.remove(key)
    .then(result => {
      console.log('result: ', result);
    })
    .catch(error => {
      console.log('error deleting data: ', error);
      return error;
    });
}

/**
 * gets a stored value based on the key parameter provided.
 * @param {sring} key - the stored key.
 */
export async function getStorage(key) {
  RNSecureStorage.get(key)
    .then(result => {
      console.log('result: ', result);
      return result;
    })
    .catch(error => {
      console.log('error getting data: ', error);
      return error;
    });
}

/**
 * gets a boolean value based on the key existance.
 * @param {sring} key - the stored key.
 */
export async function existsStorage(key) {
  RNSecureStorage.exists(key)
    .then(result => {
      console.log('result: ', result);
      return result;
    })
    .catch(error => {
      console.log('error getting data: ', error);
      return error;
    });
}
