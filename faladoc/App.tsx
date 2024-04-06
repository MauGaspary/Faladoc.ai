import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Input from './components/input';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input iconName={"person"}  placeholder={"Testetetetetet"}/>
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
