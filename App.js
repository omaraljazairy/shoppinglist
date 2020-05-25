/**
 * Shoppinglist App
 * https://github.com:omaraljazairy/Shoppinglist
 *
 * @author Omar Aljazairy
 * @version 1.1
 */

import React from 'react';
import RootNavigator from './navigations/RootNavigator';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import localeReducer from './stores/reducers/locales';
import i18n from 'i18n-js';
import {existsStorage, getStorage} from './services/utils/securestorage';
import StorageKeys from './constants/StorageKeys';
import {firebase} from '@react-native-firebase/auth';

export default function App() {
  const [language, setLanguage] = React.useState('en');
  const [userToken, setUserToken] = React.useState(null);

  // Check if user is authenticated.
  const __isUserAuthenticated = () => {
    console.log('checkUserstatus is going to be executed');
    let user = firebase.auth().currentUser;
    console.log('isUserAthenticated return user: ', user);
    if (user) {
      setUserToken(user.uid);
    }
  };

  /**
   * get the language from the secureStorage. if not found,
   * use the default language to en and store it in the
   * redux reducer.
   */
  React.useEffect(() => {
    console.log('useEffect called');
    async function _getAllPreference() {
      try {
        const language_exists = await existsStorage(StorageKeys.LANGUAGECODE);
        const user_language = language_exists
          ? await getStorage(StorageKeys.LANGUAGECODE)
          : 'en';
        setLanguage(user_language);
        i18n.locale = user_language;
      } catch (error) {
        console.log('error: ', error);
      }
    }
    _getAllPreference();
    __isUserAuthenticated();
  }, []);

  // redux store
  const rootReducer = combineReducers({
    locales: localeReducer,
  });

  // set the initial value for the reducers.
  const initialValues = {locales: {language: language}};
  const store = createStore(rootReducer, initialValues);

  return (
    <Provider store={store}>
      <RootNavigator userToken={userToken} />
    </Provider>
  );
}
