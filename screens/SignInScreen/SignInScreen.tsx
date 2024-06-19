import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import AppText from "../../components/AppText";




const SignInScreen = () => {
  return (
      <View className='flex items-center justify-center h-screen'>
        <AppText text-white text-4xl>SignInScreen</AppText>
      </View>
   
  );
};


export default SignInScreen;