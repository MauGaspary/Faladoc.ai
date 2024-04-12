import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/colors';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';



const StartSimpleScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.secondary_blue,Colors.primary_blue, Colors.primary_blue]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.textBig}>FALADOC</Text>
      </View>
    </LinearGradient>
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


export default StartSimpleScreen;