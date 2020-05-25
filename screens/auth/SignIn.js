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
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import googleConfigs from '../../configs/google';
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
   * calls the login or forgetpassword function depends on
   * the action parameter.
   * @param {string} action - login | forgotPassword
   */
  __doValidateAction(action) {
    console.log('action btn pressed: ', action);
    this.setState({...this.state, isLoading: true});
    if (
      action === 'login' &&
      this.state.email_valid &&
      this.state.secureTextEntry
    ) {
      console.log('local validation passed');
      this.__doLogin(this.state.email, this.state.password);
    } else if (action === 'forgotPassword' && this.state.email_valid) {
      console.log('forgotpassword action pressed');
      this.__doSendForgotPassword(this.state.email);
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

  /**
   * gets an email string and passes it to the sendPasswordResetEmail api.
   * returns a promise.
   * @param {string} email - user's email configured in firebase.
   * @returns Promise.
   */
  async __doSendForgotPassword(email) {
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('email link sent success');
        this.setState({...this.state, isLoading: false});
        Alert.alert(
          'Alert',
          translate(TK.FORGOT_PASSWORD_EMAIL_ALERT),
          [
            {
              text: 'OK',
              onPress: () => console.log('OK pressed'),
            },
          ],
          {cancelable: false},
        );
        this.setState({...this.state, email_valid: false});
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

  /**
   * login to the google - firebase api.
   */
  async __doGoogleLogIn() {
    console.log('GoogleLogin pressed');
    // initialize the google SDK
    console.log('webClientId to be used: ', googleConfigs.webClientId);
    GoogleSignin.configure({
      webClientId: googleConfigs.webClientId,
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
    });
    // trigger the google sigin api which will redirect the user
    // to the google site for authentication.
    // This will return a token.
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn()
        .then(user => {
          console.log('response from Google.SignIn user: ', user);
          console.log('idToken from google: ', user.idToken);
          // use the token to create the google credentails.
          const googleCredentials = auth.GoogleAuthProvider.credential(
            user.idToken,
          );
          console.log('google credentials returned: ', googleCredentials);
          auth()
            .signInWithCredential(googleCredentials)
            .then(response => {
              console.log('response from google: ', response);
              this.context.signIn();
            })
            .catch(error => {
              console.log('Error from firebase google: ', error);
              let errMsg = getError(error.code)
                ? translate(getError(error.code))
                : error.message;
              Alert.alert('ERROR', errMsg);
            });
        })
        .catch(error => {
          console.log('googleSignin error: ', error);
        });
    } catch (error) {
      console.log('Error from google: ', error);
    }
  }

  /**
   * login to the google - firebase api.
   */
  async __doGoogleLogIn2() {
    console.log('GoogleLogin pressed');
    // initialize the google SDK
    GoogleSignin.configure({
      webClientId: googleConfigs.webClientId,
    });
    // trigger the google sigin api which will redirect the user
    // to the google site for authentication.
    // This will return a token.

    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log('idToken from google: ', idToken);
      // use the token to create the google credentails.
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      console.log('google credentials returned: ', googleCredentials);

      auth()
        .signInWithCredential(googleCredentials)
        .then(response => {
          console.log('response from google: ', response);
          this.context.signIn();
        })
        .catch(error => {
          console.log('Error from firebase google: ', error);
          let errMsg = getError(error.code)
            ? translate(getError(error.code))
            : error.message;
          Alert.alert('ERROR', errMsg);
        });
    } catch (error) {
      console.log('error from google service: ', error);
    }
  }

  /**
   * login to the facebook - firebase api.
   */
  async __doFaceBookLogIn() {
    // login the user with permissions
    console.log('going to redirct to login with permissions');
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      console.log('Error from facebook with result: ', result);
      Alert.alert('ERROR', 'Can not login with facebook');
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      console.log('error no data from accessToken');
      Alert.alert('ERROR', 'No accessToken');
    }

    // call the firebase api with the facebook accesstoken.
    console.log('data from facebook AccessToken: ', data);
    const fbCredentials = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    auth()
      .signInWithCredential(fbCredentials)
      .then(response => {
        console.log('response from facebook firebase: ', response);
        this.context.signIn();
      })
      .catch(error => {
        console.log('Error from firebase facebook: ', error);
        let errMsg = getError(error.code)
          ? translate(getError(error.code))
          : error.message;
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
                  onPress={() => this.__doValidateAction('login')}>
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
                  onPress={() => this.__doFaceBookLogIn()}>
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
                  onPress={() => this.__doGoogleLogIn()}>
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
                <TouchableOpacity
                  style={styles.forgotPwdTextView}
                  onPress={() => this.__doValidateAction('forgotPassword')}>
                  <Text style={styles.forgotPwdText}>
                    {translate(TK.FORGOT_PASSWORD)}
                  </Text>
                  <Text style={styles.linkText}>
                    {translate(TK.FORGOT_PASSWORD_INSTRUCTION)}
                  </Text>
                </TouchableOpacity>
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
    height: Platform.OS === 'ios' ? 40 : 25,
  },
  signIn: {
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS === 'ios' ? 40 : 35,
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
  forgotPwdTextView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
  },
  forgotPwdText: {
    color: COLORS.FONT_A,
    fontSize: Platform.OS === 'ios' ? 15 : 12,
  },
});

export default SignIn;
