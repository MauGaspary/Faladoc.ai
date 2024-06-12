import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/colors';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from "../../components/Navbar";



const StartSimpleScreen = () => {
  return (
    <LinearGradient 
      colors={[Colors.secondary_blue,Colors.primary_blue, Colors.primary_blue]}
      className="flex-1 justify-center items-center"
    >
      <View className='flex flex-col h-screen'>
        <Text  className="text-4xl text-center font-bold opacity-60 ">FALADOC</Text>


        
      </View>
      <Navbar/>  
    </LinearGradient>
    
  );
};


export default StartSimpleScreen;