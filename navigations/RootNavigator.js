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
  const [userToken, setUserToken] = React.useState(null);

  console.log('props received from App: ', props.userToken);
  console.log('userToken: ', userToken);

  // use the useMemo to avoid rerending when the function is the same.
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('token');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('token');
      },
      email: () => {
        setIsLoading(false);
        setUserToken('token');
      },
      forgotPassword: () => {
        setIsLoading(false);
        setUserToken('token');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      console.log('useEffect called with userToken');
      setIsLoading(false);
      setUserToken(props.userToken);
      SplashScreen.hide();
    }, 2000);
  }, [props.userToken]);

  if (isLoading) {
    console.log('loading is true');
    return (
      <CustomActivityIndicator active={isLoading} color="red" size="large" />
    );
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootScreenStack userToken={userToken} />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};

export default RootNavigator;
