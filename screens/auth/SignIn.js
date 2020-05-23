import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import DismissKeyboard from '../../components/DismissKeyboard';
import {AuthContext} from '../../contexts/auth';
import {translate} from '../../services/locales/translations';
import TK from '../../constants/TranslationKeys';
import COLORS from '../../constants/Colors';
import {email, firebasePassword} from '../../services/utils/validators';
import LinearGradient from 'react-native-linear-gradient';
import {getError} from '../../services/firebaase/errorhandler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

class SignIn extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      email_valid: false,
      secureTextEntry: false,
      isLoading: false,
    };
  }

  /**
   * validate the email using the validator valideEmail function.
   * if true, set the email in the state and set the email_valid
   * to true.
   * @param {string} val - the email textInput
   */
  emailInputChange(val) {
    if (email(val)) {
      this.setState({...this.state, email: val, email_valid: true});
    } else {
      this.setState({...this.state, email: val, email_valid: false});
    }
  }

  /**
   * validate the password length is longer than 0.
   * @param {string} val - password input field
   */
  passwordInputChange(val) {
    console.log('passwordInputChange val: ', val.length);
    if (firebasePassword(val)) {
      this.setState({...this.state, password: val, secureTextEntry: true});
    } else {
      this.setState({...this.state, password: val, secureTextEntry: false});
    }
  }

  /**
   * login to the firebase after validating the email and passowrd
   */
  __doValidateAndLogin() {
    console.log('login btn pressed');
    this.setState({...this.state, isLoading: true});
    if (this.state.email_valid && this.state.secureTextEntry) {
      console.log('local validation passed');
      this.__doLogin(this.state.email, this.state.password);
    } else {
      this.setState({...this.state, isLoading: false});
      Alert.alert('Error', 'error');
    }
  }

  /**
   * call the firebase auth api to login a user to an existing account.
   * @param {string} email - emailaddress of the created account.
   * @param {string} password - password of the created account.
   */
  async __doLogin(email, password) {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(
          'response success additionalUserInfo: ',
          response.additionalUserInfo,
        );
        console.log('response success user: ', response.user);
        this.setState({...this.state, isLoading: false});
        this.context.signIn();
      })
      .catch(error => {
        console.log('error from firebase login: ');
        console.log('errorcode: ', error.code);
        console.log('error message', error.message);
        console.log(
          'error returned from getError: ',
          getError(error.code, error.message),
        );
        let errMsg = getError(error.code)
          ? translate(getError(error.code))
          : error.message;
        this.setState({...this.state, isLoading: false});
        Alert.alert('ERROR', errMsg);
      });
  }

  render() {
    if (this.state.isLoading) {
      console.log('loading is true');
      return (
        <CustomActivityIndicator
          active={this.state.isLoading}
          color="red"
          size="large"
        />
      );
    } else {
      return (
        <SafeAreaView style={styles.safearea}>
          <DismissKeyboard>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              enabled
              style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.textHeader}>
                  {translate(TK.SIGNIN_HEADER)}
                </Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.textFooter}>
                  {translate(TK.EMAIL_ADDRESS)}
                </Text>
                <View style={styles.action}>
                  <Icon name="email" color={COLORS.ICON_A} size={20} />
                  <TextInput
                    placeholder={translate(TK.EMAIL_ADDRESS)}
                    placeholderTextColor={COLORS.FONT_PLACEHOLDER}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => this.emailInputChange(val)}
                  />
                  {this.state.email_valid ? (
                    <Icon name="check" color={COLORS.ICON_A} size={20} />
                  ) : null}
                </View>
                <Text style={styles.textFooter}>{translate(TK.PASSWORD)}</Text>
                <View style={styles.action}>
                  <Icon name="lock" color={COLORS.ICON_A} size={20} />
                  <TextInput
                    placeholder={translate(TK.PASSWORD)}
                    placeholderTextColor={COLORS.FONT_PLACEHOLDER}
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={val => this.passwordInputChange(val)}
                  />
                  {this.state.secureTextEntry ? (
                    <Icon name="check" color={COLORS.ICON_A} size={20} />
                  ) : null}
                </View>
                <TouchableOpacity
                  style={styles.button}
                  disabled={
                    !(this.state.email_valid && this.state.secureTextEntry)
                  }
                  onPress={() => this.__doValidateAndLogin()}>
                  <LinearGradient
                    colors={
                      this.state.email_valid && this.state.secureTextEntry
                        ? COLORS.LGBUTTON_1
                        : COLORS.LGBUTTON_DISABLED
                    }
                    style={styles.signIn}>
                    <Text style={styles.textSignIn}>{translate(TK.LOGIN)}</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.login()}>
                  <LinearGradient
                    colors={COLORS.LGBUTTON_1}
                    style={styles.signIn}>
                    <Text style={styles.textSignIn}>
                      {translate(TK.FORGOT_PASSWORD)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.login()}>
                  <LinearGradient
                    colors={COLORS.LGBUTTON_FACEBOOK}
                    style={styles.signIn}>
                    <Icon
                      name="facebook-box"
                      color={COLORS.BUTTON_A}
                      size={20}
                    />
                    <Text style={styles.textSignIn}>
                      {translate(TK.FACEBOOK)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.login()}>
                  <LinearGradient
                    colors={COLORS.LGBUTTON_GOOGLE}
                    style={styles.signIn}>
                    <Icon name="google" color={COLORS.BUTTON_A} size={20} />
                    <Text style={styles.textSignIn}>
                      {translate(TK.GOOGLE)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signUpTextView}
                  onPress={() =>
                    this.props.navigation.navigate('SignUpScreen')
                  }>
                  <Text style={styles.signUpText}>
                    {translate(TK.NO_ACCOUNT_YET)}
                  </Text>
                  <Text style={styles.linkText}>{translate(TK.SIGNUP)}</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </DismissKeyboard>
        </SafeAreaView>
      );
    }
  }
}

// const screenHight = Dimensions.get('screen').height;
// const logoHight = screenHight * 0.18;
// {/* <Button
// title="SignIn"
// onPress={() => {
// this.context.signIn();
// }}
// /> */}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND_A,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footer: {
    flex: 5,
    backgroundColor: COLORS.BACKGROUND_B,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
    width: '100%',
  },
  textHeader: {
    color: COLORS.FONT_B,
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 30 : 20,
  },
  textFooter: {
    color: COLORS.FONT_A,
    fontSize: Platform.OS === 'ios' ? 18 : 15,
    marginBottom: Platform.OS === 'ios' ? 0 : -5,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDERBOTTOM,
    paddingBottom: 5,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    color: COLORS.FONT_A,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingBottom: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  signIn: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignIn: {
    fontSize: 14,
    color: COLORS.FONT_A,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  signUpText: {
    color: COLORS.FONT_A,
    fontSize: Platform.OS === 'ios' ? 15 : 12,
  },
  linkText: {
    color: COLORS.FONT_A,
    fontSize: Platform.OS === 'ios' ? 15 : 12,
    textDecorationLine: 'underline',
  },
  signUpTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
});

export default SignIn;
