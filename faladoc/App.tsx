import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { AddPatientModal } from './components/AddPatientModal';

export default function App() {
  return (
    <View className="flex-1 items-center mt-[40%] bg-white">
        <AddPatientModal />
    </View>
  );
}

