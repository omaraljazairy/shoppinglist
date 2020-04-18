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
 * uses Firebase authentication to signup the user there.
 * It will not include any other provider.
 * @author Omar Aljazairy
 * @version 1.0
 */

class SignUp extends Component {
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
              <Text>SignUp Screen</Text>
              <Button
                title="SignUp"
                onPress={() => {
                  this.context.signUp();
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

export default SignUp;
