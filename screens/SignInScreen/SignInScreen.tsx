import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View,Keyboard, Pressable } from 'react-native';
import AppText from "../../components/AppText";

const handleScreenPress = () => {
  Keyboard.dismiss();
};


const SignInScreen = () => {
  return (
    <Pressable className='h-full' onPress={handleScreenPress}>
      <View className='flex items-center justify-center h-screen'>
        <AppText text-white text-4xl>SignInScreen</AppText>
      </View>
    </Pressable>
   
  );
};


export default SignInScreen;