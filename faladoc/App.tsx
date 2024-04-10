import React from 'react';
import { View } from 'react-native';
import ConsultaAtendimento from './src/screens/ConsultaAndamento'; 
import styles from './src/screens/ConsultaAndamento/style';
import { MyContextProvider } from './provider/AudioContext';

export default function App() {
  return (
    <MyContextProvider>
      <View style={styles.container}>
        <ConsultaAtendimento />
      </View>
    </MyContextProvider>
  );
}