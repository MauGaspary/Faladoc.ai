import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ProcessingScreen } from './src/ProcessingScreen';
export default function App() {
  return (
    <View style={styles.container}>
      <ProcessingScreen patient="maria" hospital="moinhos" contexto="consulta"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
