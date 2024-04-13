import React from 'react';
import { Text, View } from 'react-native';
import { AddPatientModal } from './components/AddPatientModal';
import { NativeWindStyleSheet } from 'nativewind';
import Navbar from "./components/navbar/Navbar";


NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-background'>
      <AddPatientModal />
      <Navbar />
    </View>
  );
}
