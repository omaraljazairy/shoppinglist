import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {AuthContext} from '../../contexts/auth';

/**
 * handles the signout of the user from firebase or any other
 * provider.
 * @author Omar Aljazairy
 * @version 1.0
 */

const SignOut = () => {
  // the authcontext added
  const auth = useContext(AuthContext);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <View>
            <Text>SignOut Screen</Text>
            <Button
              title="SignOut"
              onPress={() => {
                auth.signOut();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignOut;
