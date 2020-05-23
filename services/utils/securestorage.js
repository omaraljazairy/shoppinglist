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
  console.log('key to search for: ', key);
  try {
    const result = await RNSecureStorage.remove(key);
    console.log('result: ', result);
    return result;
  } catch (e) {
    console.log('exception removing data: ', e);
  }
}

/**
 * gets a stored value based on the key parameter provided.
 * @param {sring} key - the stored key.
 */
export async function getStorage(key) {
  console.log('key to search for: ', key);
  try {
    const data = await RNSecureStorage.get(key);
    console.log('data: ', data);
    return data;
  } catch (e) {
    console.log('exception getting data: ', e);
  }
}

/**
 * gets a boolean value based on the key existance.
 * @param {sring} key - the stored key.
 */
export async function existsStorage(key) {
  try {
    const exists = await RNSecureStorage.exists(key);
    console.log('key: ', key, ' exists: ', exists);
    return exists;
  } catch (e) {
    console.log('exception finding key: ', e);
    return e;
  }
}
