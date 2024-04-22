import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/colors';




const SignInScreen = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.textBig}>SignInScreen</Text>
      </View>
   
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBig: {
    color: Colors.primary_white,
    fontSize: 40,
  },
});


export default SignInScreen;