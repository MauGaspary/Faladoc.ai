import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/colors';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from "../../components/Navbar";
import AppText from "../../components/AppText";



const ExampleScreen = () => {
  return (
      <View style={styles.container}>
        <AppText style={styles.textBig}>Example Screen</AppText>
        <Navbar/>
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


export default ExampleScreen;