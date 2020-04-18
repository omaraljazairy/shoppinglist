import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

class About extends Component {
  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View>
          <View style={styles.container}>
            <Text>About Screen</Text>
          </View>
        </View>
      </SafeAreaView>
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

export default About;
