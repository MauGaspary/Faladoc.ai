import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ProcessingScreen } from './src/ProcessingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ProcessingScreen patient="" appointment_id='' hospital="" contexto="" duration= "12:38"/>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
