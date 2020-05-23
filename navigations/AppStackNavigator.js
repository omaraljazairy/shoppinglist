/**
 * define all the app routing of the application after the user
 * is logged in
 * @author Omar Aljazairy
 * @version 1.1
 */

/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable-next-line react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/app/Home';
import Details from '../screens/app/Details';
import Products from '../screens/app/Products';
import Chat from '../screens/app/Chat';
import Profile from '../screens/app/Profile';
import SignOut from '../screens/auth/SignOut';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {Icon, Button} from 'native-base';
import {translate} from '../services/locales/translations';
import TK from '../constants/TranslationKeys';

const AppStack = createStackNavigator();

// the application's home screen stack component
const AppScreenStack = ({navigation}) => (
  <AppStack.Navigator
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
    <AppStack.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerTitle: translate(TK.SCREEN_HEADER_HOME),
        headerRight: () => (
          <Button transparent>
            <Icon
              name="menu"
              style={{color: Colors.DRAWER_HEADER_BTN}}
              onPress={() => navigation.openDrawer()}
            />
          </Button>
        ),
      }}
    />
    <AppStack.Screen
      name="DetailsScreen"
      component={Details}
      options={{
        title: translate(TK.SCREEN_HEADER_DETAILS),
        headerRight: () => (
          <Button transparent>
            <Icon
              name="menu"
              style={{color: Colors.DRAWER_HEADER_BTN}}
              onPress={() => navigation.openDrawer()}
            />
          </Button>
        ),
      }}
    />
    <AppStack.Screen
      name="ProductsScreen"
      component={Products}
      options={{title: translate(TK.SCREEN_HEADER_PRODUCTS)}}
    />
    <AppStack.Screen
      name="ChatScreen"
      component={Chat}
      options={{title: translate(TK.SCREEN_HEADER_CHAT)}}
    />
    <AppStack.Screen
      name="ProfileScreen"
      component={Profile}
      options={{title: translate(TK.SCREEN_HEADER_PROFILE)}}
    />
    <AppStack.Screen
      name="SignOutScreen"
      component={SignOut}
      options={{title: translate(TK.SCREEN_HEADER_SIGNOUT)}}
    />
  </AppStack.Navigator>
);

export default AppScreenStack;
