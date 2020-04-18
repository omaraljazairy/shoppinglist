import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';

class Home extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <Text>Home Screen</Text>
              <Button
                title="Details"
                onPress={() => this.props.navigation.push('DetailsScreen')}
              />
              <Button
                title="Products"
                onPress={() => this.props.navigation.navigate('ProductsScreen')}
              />
              <Button
                title="Open Drawer"
                onPress={() => this.props.navigation.toggleDrawer()}
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
});

export default Home;
