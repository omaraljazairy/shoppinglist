import React, {Component} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

class DismissKeyboard extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
}

export default DismissKeyboard;
