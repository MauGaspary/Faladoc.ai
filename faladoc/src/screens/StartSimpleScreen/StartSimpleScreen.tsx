import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/colors';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';



const StartSimpleScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.secondary_blue,Colors.primary_blue, Colors.primary_blue]}
      style={styles.container}
    >
      <View style={styles.content}>
      <Image source={require('../../assets/Group3.png')} style={styles.image} />
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
  image: {
    width: 200, 
    height: 200, 
  },
});


export default StartSimpleScreen;