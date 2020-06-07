import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';

const Home = props => {
  const storedUser = useSelector(state => state.user.userDate);

  React.useEffect(() => {
    setTimeout(() => {
      console.log('useEffect called from Home screen');
      console.log('stored user: ', storedUser);
    }, 2000);
  }, [storedUser]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <View>
            <Text>Home Screen</Text>
            <Button
              title="Details"
              onPress={() => props.navigation.push('DetailsScreen')}
            />
            <Button
              title="Products"
              onPress={() => props.navigation.navigate('ProductsScreen')}
            />
            <Button
              title="Open Drawer"
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
