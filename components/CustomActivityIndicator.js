import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
/**
 * is a custum activityIndicator to be used in this app.
 * it requires the following props:
 * active: bool
 * colo: string
 * size: string
 * @author Omar Aljazairy
 * @version 1.0
 */

class CustomActivityIndicator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={this.props.active}
          color={this.props.color}
          size={this.props.size}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default CustomActivityIndicator;
