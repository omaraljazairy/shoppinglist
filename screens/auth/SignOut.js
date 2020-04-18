import React, {Component} from 'react';
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

class SignOut extends Component {
  // the authcontext added
  static contextType = AuthContext;

  /**
   * set any values to be initialized by the constructor.
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.context);
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
                  this.context.signOut();
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignOut;
