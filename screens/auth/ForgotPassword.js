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
 * form to process the forgotpassword request done with firebase.
 * @author Omar Aljazairy
 * @version 1.0
 */

class ForgotPassword extends Component {
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
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <Text>ForgotPassword Screen</Text>
              <Button
                title="Forgot Password"
                onPress={() => {
                  this.context.forgotPassword();
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

export default ForgotPassword;
