import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import {AuthContext} from '../../contexts/auth';

class SignIn extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.mainView}>
            <View>
              <Text>SignIn Screen</Text>
              <Button
                title="SignIn"
                onPress={() => {
                  this.context.signIn();
                }}
              />
            </View>
            <View>
              <Button
                title="SignUp"
                onPress={() => {
                  this.props.navigation.push('SignUpScreen');
                }}
              />
              <Button
                title="ForgotPasswordScreen"
                onPress={() => {
                  this.props.navigation.push('ForgotPasswordScreen');
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
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignIn;
