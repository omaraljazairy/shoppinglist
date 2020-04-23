/**
 * Shoppinglist App
 * https://github.com:omaraljazairy/Shoppinglist
 *
 * @author Omar Aljazairy
 * @version 1.0
 */

import React from 'react';
import AppNavigator from './navigations/AppStackNavigator';
import {existsStorage, getStorage} from './services/utils/securestorage';

/**
 * loads users preference when the application is loaded.
 */
async function _getAllPreference() {
  try {
    // check if the darkTheme key exists, if not return false.
    const exists = await existsStorage('darkTheme');
    console.log('preference exists: ', exists);
    const preference = exists ? await getStorage('darkTheme') : false;
    return preference;
  } catch (error) {
    console.log('error: ', error);
  }
}

export default function App() {
  _getAllPreference();

  return <AppNavigator />;
}

// export default App;
