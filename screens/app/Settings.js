import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

class Settings extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <Text>Settings Screen</Text>
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

export default Settings;
