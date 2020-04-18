import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Fonts from '../../constants/Fonts';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * custom draer content using the react-native-paper library.
 * @param {*} props - get props from the AppStackNavigation.
 * @author Omar Aljazairy
 * @version 1.0
 * @todo - theme color - profile image - open and closed items
 */
export function DrawerContent(props) {
  // used for the preference of the switch theme. set it to false as default
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  /**
   * sets the value of the isDarkTheme to the opposite of what it is.
   */
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <DrawerContentScrollView {...props}>
        <View style={styles.useInfoSection}>
          <View style={styles.avatar}>
            <Avatar.Image
              source={require('../../assets/fedal.png')}
              size={100}
            />
            <View style={styles.avatarInfo}>
              <Title style={styles.title}>Fedal</Title>
              <Caption style={styles.caption}>@fedal.net</Caption>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                15
              </Paragraph>
              <Caption style={styles.caption}>Open Items</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                4
              </Paragraph>
              <Caption style={styles.caption}>Bought Items</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => props.navigation.navigate('HomeScreen')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="Contacts"
            onPress={() => props.navigation.navigate('ChatScreen')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="face-profile" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => props.navigation.navigate('ProfileScreen')}
          />
        </Drawer.Section>
        <Drawer.Section title="Preference">
          <TouchableRipple
            onPress={() => {
              toggleTheme();
            }}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={isDarkTheme} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => props.navigation.navigate('SignOutScreen')}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  avatar: {
    flexDirection: 'row',
    marginTop: 15,
  },
  avatarInfo: {
    marginLeft: 15,
    marginTop: 30,
    flexDirection: 'column',
  },
  useInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
