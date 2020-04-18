import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

class Products extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <Text>Product Screen</Text>
              <Button
                title="Home"
                onPress={() => this.props.navigation.push('HomeScreen')}
              />
              <Button
                title="Details"
                onPress={() => this.props.navigation.navigate('DetailsScreen')}
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

export default Products;
