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
    <View>
      <AddPatientModal />
      <Navbar />
    </View>
  );
}
