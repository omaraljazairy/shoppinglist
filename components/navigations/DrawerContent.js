import React, {useState, useContext} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {firebase} from '@react-native-firebase/auth';
import {AuthContext} from '../../contexts/auth';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import {useSelector} from 'react-redux';
/**
 * custom draer content using the react-native-paper library.
 * @param {*} props - get props from the AppStackNavigation.
 * @author Omar Aljazairy
 * @version 1.0
 * @todo - theme color - profile image - open and closed items
 */
export function DrawerContent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AuthContext);
  const user = useSelector(state => state.user.userDate);

  /**
   * signout from the app and return the user to the main screen.
   */
  async function __signOut() {
    setIsLoading(true);
    await firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signed out successfully: ');
        setIsLoading(false);
        context.signOut();
      })
      .catch(error => {
        console.log('signout failed with error: ', error);
      });
  }

  if (isLoading) {
    console.log('loading is true');
    return (
      <CustomActivityIndicator active={isLoading} color="red" size="large" />
    );
  } else {
    console.log('user photoURL: ', user.profile.photoURL);
    return (
      <SafeAreaView style={styles.safearea}>
        <DrawerContentScrollView {...props}>
          <View style={styles.useInfoSection}>
            <View style={styles.avatar}>
              <Avatar.Image
                source={
                  user.profile.photoURL
                    ? {uri: user.profile.photoURL}
                    : require('../../assets/account.png')
                }
                size={100}
              />
              <View style={styles.avatarInfo}>
                <Title style={styles.title}>{user.profile.displayName}</Title>
                <Caption style={styles.caption}>{user.profile.email}</Caption>
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
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => __signOut()}
          />
        </Drawer.Section>
      </SafeAreaView>
    );
  }
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
  language: {
    marginTop: 5,
    marginRight: 20,
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
