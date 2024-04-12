import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { StopPauseButton } from './components/StopPauseButton';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex flex-row items-center">
        <StopPauseButton type="stop" onPress={() => {}} />
        <StopPauseButton type="pause" onPress={() => {}} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

