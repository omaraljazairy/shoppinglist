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
  __doValidateAndSignUp() {
    console.log('signup btn pressed');
    this.setState({...this.state, isLoading: true});
    if (this.state.email_valid && this.state.secureTextEntry) {
      console.log('local validation passed');
      this.__doSignUp(this.state.email, this.state.password);
    } else {
      this.setState({...this.state, isLoading: false});
      Alert.alert('Error', 'error');
    }
  }

  /**
   * call the firebase auth api to signup a user with a new account.
   * @param {string} email
   * @param {string} password
   */
  async __doSignUp(email, password) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log('response success: ', response);
        this.setState({...this.state, isLoading: false});
        Alert.alert('Success', 'Authentication success');
        this.context.signUp();
      })
      .catch(error => {
        console.log('error from firebase signup: ');
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
                  {translate(TK.SIGNUP_HEADER)}
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
                  onPress={() => this.__doValidateAndSignUp()}>
                  <LinearGradient
                    colors={
                      this.state.email_valid && this.state.secureTextEntry
                        ? COLORS.LGBUTTON_1
                        : COLORS.LGBUTTON_DISABLED
                    }
                    style={styles.signUp}>
                    <Text style={styles.textSignUp}>
                      {translate(TK.SIGNUP)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.textFooterTC}>
                  {translate(TK.SIGNUP_FOOTER)}
                </Text>
              </View>
            </KeyboardAvoidingView>
          </DismissKeyboard>
        </SafeAreaView>
      );
    }
  }
}

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
    flex: 2,
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
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    paddingBottom: 60,
  },
  textFooter: {
    color: COLORS.FONT_A,
    fontSize: Platform.OS === 'ios' ? 18 : 15,
    marginBottom: Platform.OS === 'ios' ? 0 : -5,
  },
  textFooterTC: {
    color: COLORS.FONT_A,
    fontSize: Platform.OS === 'ios' ? 15 : 12,
    paddingTop: Platform.OS === 'ios' ? 30 : 30,
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
  signUp: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignUp: {
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

export default SignUp;
