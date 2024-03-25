import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { StopPauseButton } from './components/StopPauseButton';


// DEMOSTRATIVO, TROCAR POR FUNÇÃO REAL
function consoleLog() {
  console.log('Button pressed');
}

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex flex-row items-center">
        <StopPauseButton type="pause" onPress={consoleLog} />
        <StopPauseButton type="stop" onPress={consoleLog} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

