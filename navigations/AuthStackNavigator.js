/**
 * Stack navigator for the main Authentication screens
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import SignOut from '../screens/auth/SignOut';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Intro from '../screens/auth/Intro';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {translate} from '../services/locales/translations';
import TK from '../constants/TranslationKeys';

const AuthStack = createStackNavigator();

const AuthScreenStack = () => (
  <AuthStack.Navigator
    initialRouteName="IntroScreen"
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.HEADER_BG,
      },
      headerTintColor: Colors.HEADER_BG_TINT,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: Fonts.STATUS_BAR_TITLE_WEIGHT,
      },
    }}>
    <AuthStack.Screen
      name="IntroScreen"
      component={Intro}
      options={{
        title: translate(TK.SCREEN_HEADER_INTRO),
      }}
    />
    <AuthStack.Screen
      name="SignInScreen"
      component={SignIn}
      options={{
        title: translate(TK.SCREEN_HEADER_SIGNIN),
      }}
    />
    <AuthStack.Screen
      name="SignUpScreen"
      component={SignUp}
      options={{
        title: translate(TK.SCREEN_HEADER_SIGNUP),
      }}
    />
    <AuthStack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPassword}
      options={{
        title: translate(TK.SCREEN_HEADER_FORGOTPASSWORD),
      }}
    />
    <AuthStack.Screen
      name="SignOutScreen"
      component={SignOut}
      options={{
        title: translate(TK.SCREEN_HEADER_SIGNOUT),
      }}
    />
  </AuthStack.Navigator>
);

export default AuthScreenStack;
