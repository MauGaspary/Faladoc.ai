import React from 'react';
import { View } from 'react-native';
import ConsultaAtendimento from './src/screens/ConsultaAndamento'; 
import styles from './src/screens/ConsultaAndamento/style';

export default function App() {
  return (
    <View style={styles.container}>
      <ConsultaAtendimento />
    </View>
  );
}


