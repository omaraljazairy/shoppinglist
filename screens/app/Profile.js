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
import {getLocaleDateTime} from '../../services/locales/datetimeformatters';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';

/**
 * handles the Profile users page
 * @author Omar Aljazairy
 * @version 1.0
 */

const Profile = props => {
  const user = useSelector(state => state.user.userDate);

  return (
    <>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Animatable.Image
              animation="fadeInRightBig"
              duration={1500}
              source={
                user.profile.photoURL
                  ? {uri: user.profile.photoURL}
                  : require('../../assets/account.png')
              }
              style={styles.logo}
              resizeMode="stretch"
            />
            <MaterialIcons name="edit" color={COLORS.BUTTON_B} size={20} />
            <Text style={styles.title}>
              <MaterialIcons name="edit" color={COLORS.BUTTON_B} size={20} />
              {user.profile.displayName}
            </Text>
            <Text style={styles.title2}>{user.profile.email}</Text>
          </View>
          <Animatable.View animation="fadeInLeftBig" style={styles.footer}>
            <Text style={styles.footerTitles}>
              {translate(TK.CREATED)}: {getLocaleDateTime(user.creationTime)}
            </Text>
            <Text style={styles.footerTitles}>
              {translate(TK.LAST_LOGGEDIN)}:{' '}
              {getLocaleDateTime(user.lastLoggedIn)}
            </Text>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Save button pressed');
                }}>
                {user.providerId === 'password' ||
                user.providerId === 'apple.com' ? (
                  <LinearGradient
                    colors={COLORS.LGBUTTON_1}
                    style={styles.saveBtn}>
                    <Text style={styles.textSave}>{translate(TK.SAVE)}</Text>
                    <MaterialIcons
                      name="navigate-next"
                      color={COLORS.BUTTON_A}
                      size={20}
                    />
                  </LinearGradient>
                ) : null}
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    width: logoHight,
    height: logoHight,
    borderRadius: Platform.OS === 'ios' ? 75 : 30,
  },
  footerTitles: {
    color: COLORS.FONT_A,
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerText: {
    color: COLORS.FONT_A,
    fontSize: 15,
    fontWeight: 'normal',
  },
  title: {
    color: COLORS.FONT_B,
    fontSize: 25,
    fontWeight: 'bold',
  },
  title2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
  },
  text: {
    color: COLORS.FONT_A,
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  saveBtn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSave: {
    color: COLORS.FONT_A,
    fontWeight: 'bold',
  },
});

export default Profile;
