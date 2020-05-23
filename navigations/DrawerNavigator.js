import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../components/navigations/DrawerContent';
import SignOut from '../screens/auth/SignOut';
import Profile from '../screens/app/Profile';
import Chat from '../screens/app/Chat';
import TabsScreenStack from './TabNavigator';
import {translate} from '../services/locales/translations';
import TK from '../constants/TranslationKeys';
// all navigators of the application
const DrawerStack = createDrawerNavigator();

const DrawerScreenStack = () => (
  <DrawerStack.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <DrawerStack.Screen
      name="Home"
      component={TabsScreenStack}
      options={{title: translate(TK.SCREEN_HEADER_HOME)}}
    />
    <DrawerStack.Screen
      name="Chat"
      component={Chat}
      options={{title: translate(TK.SCREEN_HEADER_CHAT)}}
    />
    <DrawerStack.Screen
      name="Profile"
      component={Profile}
      options={{title: translate(TK.SCREEN_HEADER_PROFILE)}}
    />
    <DrawerStack.Screen
      name="SignOut"
      component={SignOut}
      options={{title: translate(TK.SCREEN_HEADER_SIGNOUT)}}
    />
  </DrawerStack.Navigator>
);

export default DrawerScreenStack;
