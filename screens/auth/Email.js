import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import {AuthContext} from '../../contexts/auth';

const Email = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <View>
            <Text>Email Screen</Text>
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

export default Email;
