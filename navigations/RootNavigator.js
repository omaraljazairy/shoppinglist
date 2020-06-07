/**
 * the main root stack that will hold the naviagtion between the
 * app and the authentication. When the application loads it
 * will load this RootNavigator.
 * @author Omar Aljazairy
 * @version 1.0
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from '../contexts/auth';
import AuthScreenStack from './AuthStackNavigator';
import DrawerScreenStack from './DrawerNavigator';
import User from '../models/user';
import {
  setStorage,
  getStorage,
  deleteStorage,
} from '../services/utils/securestorage';
import {useDispatch} from 'react-redux';
import {setUser, deleteUser} from '../stores/actions/user';
import StorageKeys from '../constants/StorageKeys';

const RootStack = createStackNavigator();

const RootScreenStack = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreenStack}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthScreenStack}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

// the main navigationcontroller here hold a drawer stack. it consists of
// the tabs stack which already contains the home stack.
// In addition it contains the chat and profile screen components.
const RootNavigator = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthUser, setIsAuthUser] = React.useState(false);

  console.log('props received from App: ', props);
  // use to dispatch the user reducer
  const dispatch = useDispatch();

  /**
   * get the provider data with the token when user logged in and
   * create a user object from them and store it the keychain storage.
   * @param {object} providerData - the firebase response data
   * @param {string} token - token provided by each provider.
   */
  const storeUserDateFromProvider = async (providerData, token) => {
    const user = User.createUser(providerData, token);
    await setStorage(StorageKeys.USER, user);
    setIsAuthUser(user);
  };
  /**
   * remove the userdata from the store.
   */
  const removeUserFromStorage = () => {
    console.log('remove user from storage');
    deleteStorage(StorageKeys.USER);
    setIsAuthUser(false);
  };

  /**
   * check if the user stored in the storage.
   */
  const getAuthUser = async () => {
    console.log('check if user is in the storage and still active');
    const user = await getStorage(StorageKeys.USER);
    if (user) {
      console.log('user found in store');
      //   console.log(user);
      setIsAuthUser(user);
    } else {
      console.log('no user found');
      setIsAuthUser(false);
    }
  };

  // use the useMemo to avoid rerending when the function is the same.
  const authContext = React.useMemo(() => {
    return {
      signIn: (providerData, token) => {
        setIsLoading(false);
        storeUserDateFromProvider(providerData, token);
      },
      signUp: (providerData, token) => {
        setIsLoading(false);
        storeUserDateFromProvider(providerData, token);
      },
      signOut: () => {
        setIsLoading(false);
        removeUserFromStorage();
        dispatch(deleteUser());
      },
    };
  }, [dispatch]);

  React.useEffect(() => {
    setTimeout(() => {
      console.log('useEffect called with userToken');
      setIsLoading(false);
      getAuthUser();
      SplashScreen.hide();
    }, 2000);
  }, []);

  if (isLoading) {
    console.log('loading is true');
    return (
      <CustomActivityIndicator active={isLoading} color="red" size="large" />
    );
  } else {
    dispatch(setUser(isAuthUser));
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootScreenStack userToken={isAuthUser} />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};

export default RootNavigator;
