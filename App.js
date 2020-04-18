/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React, {useEffect} from 'react';
import React from 'react';
// import AuthhNavigator from './navigations/AuthStackNavigator';
import AppNavigator from './navigations/AppStackNavigator';
// import DrawNavigator from './navigations/DrawNavigator';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

//import SplashScreen from 'react-native-splash-screen';

export default function App() {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return <AppNavigator />;
}

// export default App;
