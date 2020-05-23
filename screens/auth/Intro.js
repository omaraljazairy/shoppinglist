import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {translate} from '../../services/locales/translations';
import TK from '../../constants/TranslationKeys';
import COLORS from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

/**
 * handles the introduction page for unauthenticated users
 * @author Omar Aljazairy
 * @version 1.1
 */

const Intro = props => {
  return (
    <>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Animatable.Image
              animation="fadeInRightBig"
              duration={1500}
              source={require('../../assets/fedal.png')}
              style={styles.logo}
              resizeMode="stretch"
            />
          </View>
          <Animatable.View animation="fadeInLeftBig" style={styles.footer}>
            <Text style={styles.title}>
              {translate(TK.INTRO_WELCOME_HEADER)}
            </Text>
            <Text style={styles.text}>{translate(TK.INTRO_WELCOME_BODY)}</Text>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('SignInScreen');
                }}>
                <LinearGradient
                  colors={COLORS.LGBUTTON_1}
                  style={styles.signIn}>
                  <Text style={styles.textSign}>{translate(TK.NEXT)}</Text>
                  <MaterialIcons
                    name="navigate-next"
                    color={COLORS.BUTTON_A}
                    size={20}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </SafeAreaView>
    </>
  );
};

const screenHight = Dimensions.get('screen').height;
const logoHight = screenHight * 0.18;

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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_B,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    width: '100%',
  },
  logo: {
    width: logoHight,
    height: logoHight,
    borderRadius: Platform.OS === 'ios' ? 75 : 30,
  },
  title: {
    color: COLORS.FONT_A,
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    color: COLORS.FONT_A,
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: COLORS.FONT_A,
    fontWeight: 'bold',
  },
});

export default Intro;
