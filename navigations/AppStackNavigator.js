/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/app/Home';
import Details from '../screens/app/Details';
import Products from '../screens/app/Products';
import Chat from '../screens/app/Chat';
import Profile from '../screens/app/Profile';
import Settings from '../screens/app/Settings';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import SignOut from '../screens/auth/SignOut';
import ForgotPassword from '../screens/auth/ForgotPassword';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from '../contexts/auth';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {Icon, Button} from 'native-base';
import {DrawerContent} from '../components/navigations/DrawerContent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * define all the navigations and routing of the application.
 * @author Omar Aljazairy
 * @version 1.0
 */

// all navigators of the application
const DrawerStack = createDrawerNavigator();
const AuthStack = createStackNavigator();
const TabsStack = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
const RootStack = createStackNavigator();

// the application's home screen stack component
const HomeScreenStack = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.STATUS_BAR,
      },
      headerTintColor: Colors.STATUS_BAR_TINT,
      headerTitleStyle: {
        fontWeight: Fonts.STATUS_BAR_TITLE_TYLE,
      },
    }}>
    <HomeStack.Screen
      name="HomeScreen"
      component={Home}
      options={{
        title: 'Home',
        headerRight: () => (
          <Button transparent>
            <Icon
              name="menu"
              style={{color: 'white'}}
              onPress={() => navigation.openDrawer()}
            />
          </Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="DetailsScreen"
      component={Details}
      options={{
        title: 'Details',
        headerRight: () => (
          <Button transparent>
            <Icon
              name="menu"
              style={{color: 'white'}}
              onPress={() => navigation.openDrawer()}
            />
          </Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="ProductsScreen"
      component={Products}
      options={{title: 'Products'}}
    />
    <HomeStack.Screen
      name="ChatScreen"
      component={Chat}
      options={{title: 'Chats'}}
    />
    <HomeStack.Screen
      name="ProfileScreen"
      component={Profile}
      options={{title: 'Profile'}}
    />
    <HomeStack.Screen
      name="SignOutScreen"
      component={SignOut}
      options={{title: 'SignOut'}}
    />
  </HomeStack.Navigator>
);

// the settings stack component.
const SettingsScreenStack = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen name="SettingsScreen" component={Settings} />
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
      component={HomeScreenStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
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
      }}
    />
  </TabsStack.Navigator>
);

const DrawerScreenStack = () => (
  <DrawerStack.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <DrawerStack.Screen name="Home" component={TabsScreenStack} />
    <DrawerStack.Screen name="Chat" component={Chat} />
    <DrawerStack.Screen name="Profile" component={Profile} />
    <DrawerStack.Screen name="SignOut" component={SignOut} />
  </DrawerStack.Navigator>
);

const AuthScreenStack = () => (
  <AuthStack.Navigator initialRouteName="SignScreen">
    <AuthStack.Screen name="SignScreen" component={SignIn} />
    <AuthStack.Screen name="SignUpScreen" component={SignUp} />
    <AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    <AuthStack.Screen name="SignOutScreen" component={SignOut} />
  </AuthStack.Navigator>
);

// the main root stack that will hold the naviagtion between the
// app and the authentication.
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
const AppNavigator = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

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
      console.log('setTimeout');
      setIsLoading(false);
      SplashScreen.hide();
    }, 1000);
  }, []);

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

export default AppNavigator;
