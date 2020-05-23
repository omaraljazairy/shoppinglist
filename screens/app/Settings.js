/**
 * Application settings will be presented in this component
 * @author Omar Aljazairy
 * @version 1.1
 */

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Container,
  Picker,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  List,
} from 'native-base';
import {setStorage} from '../../services/utils/securestorage';
import {setLanguage} from '../../stores/actions/locales';
import {useDispatch, useSelector} from 'react-redux';
import StorageKeys from '../../constants/StorageKeys';
import i18n from 'i18n-js';

function Settings() {
  // get the initial language value from the store and pass it to
  // the use ln state.
  const storeLanguage = useSelector(state => state.locales.language);
  const [ln, setLn] = useState(storeLanguage);

  // need todetermine the width of the screen per os so the line
  // of the list will be shown.
  const screenWidth = Dimensions.get('screen').width;

  // because on ios the property color in style doesn't exist
  // create a seperate style per os to add it.
  const osstyles = Platform.OS === 'android' ? {color: 'black'} : {};

  // use to dispatch the locale reducer
  const dispatch = useDispatch();

  /**
   * has the following actions:
   * 1- change the state value of the language.
   * 2- set the language in the redux store.
   * 3- saves the language in the secureStorage.
   * 4- change the i18n language for the whole application.
   * @param {string} lValue - the value to change the state.
   */
  function onValueChange(lValue) {
    console.log('value: ', lValue);
    setLn(lValue);
    dispatch(setLanguage(lValue));
    setStorage(StorageKeys.LANGUAGECODE, lValue);
    i18n.locale = lValue;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Container>
          <Content>
            <List>
              <ListItem icon>
                <Left>
                  <Button style={{backgroundColor: '#FF9501'}}>
                    <Icon active name="airplane" />
                  </Button>
                </Left>
                <Body>
                  <Text>Language</Text>
                </Body>
                <Right>
                  <Switch value="Color" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{backgroundColor: '#007AFF'}}>
                    <Icon active name="wifi" />
                  </Button>
                </Left>
                <Body>
                  <Text>Wi-Fi</Text>
                </Body>
                <Right>
                  <Text>GeekyAnts</Text>
                  <Icon active name="checkmark" color={'blue'} />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{backgroundColor: '#007AFF'}}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Bluetooth</Text>
                </Body>
                <Right>
                  <Text>On</Text>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem itemDivider>
                <Text>Language</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Picker
                  note
                  mode="drop-down"
                  textStyle={{color: 'black'}}
                  style={{
                    ...osstyles,
                    width: screenWidth,
                  }}
                  selectedValue={ln}
                  onValueChange={onValueChange.bind(this)}>
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Spanish" value="es" />
                  <Picker.Item label="Dutch" value="nl" />
                  <Picker.Item label="Arabic" value="ar" />
                </Picker>
              </ListItem>
            </List>
          </Content>
        </Container>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    height: 30,
    marginLeft: Platform.OS === 'ios' ? 0 : 10,
  },
});

export default Settings;
