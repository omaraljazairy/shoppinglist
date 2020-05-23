/**
 * define the tab navigation screens and items.
 * @author Omar Aljazairy
 * @version 1.1
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../screens/app/Settings';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import AppScreenStack from './AppStackNavigator';
import {translate} from '../services/locales/translations';
import TK from '../constants/TranslationKeys';

const TabsStack = createBottomTabNavigator();
const SettingStack = createStackNavigator();

// the settings stack component.
const SettingsScreenStack = () => (
  <SettingStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.BACKGROUND_BLUE,
      },
      headerTintColor: Colors.BACKGROUND_WHITE,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: Fonts.STATUS_BAR_TITLE_WEIGHT,
      },
    }}>
    <SettingStack.Screen
      name="SettingsScreen"
      component={Settings}
      options={{title: translate(TK.SCREEN_HEADER_SETTINGS)}}
    />
  </SettingStack.Navigator>
);

// tab bar stack. the component here only takes stack components.
const TabsScreenStack = () => (
  <TabsStack.Navigator
    tabBarOptions={{
      activeBackgroundColor: Colors.ACTIVE_BG,
      inactiveBackgroundColor: Colors.INACTIVE_BG,
      inactiveTintColor: Colors.INACTIVE_TINT,
      activeTintColor: Colors.ACTIVE_TINT,
    }}>
    <TabsStack.Screen
      name="HomeScreen"
      component={AppScreenStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        title: translate(TK.SCREEN_HEADER_HOME),
      }}
    />
    <TabsStack.Screen
      name="SettingsScreen"
      component={SettingsScreenStack}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="settings" color={color} size={size} />
        ),
        title: translate(TK.SCREEN_HEADER_SETTINGS),
      }}
    />
  </TabsStack.Navigator>
);

export default TabsScreenStack;
