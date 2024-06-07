import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import { SessionProvider } from "../provider/sessionContext";

// Import Screens
import StartSimpleScreen from '../screens/StartSimpleScreen/StartSimpleScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import ConsultaAndamentoScreen from "../screens/ConsultaAndamento/ConsultaAndamentoScreen";
import IniciarNovaConsultaScreen from '../screens/IniciarNovaConsulta/IniciarNovaConsultaScreen';

// Import Components
import { AddPatientModal } from '../components/AddPatientModal';

// Import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import CSS
import { NativeWindStyleSheet } from 'nativewind';

import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens();

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Iniciar Nova Consulta" component={IniciarNovaConsultaScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Consulta Andamento" component={ConsultaAndamentoScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Simple Screen" component={StartSimpleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Navigation() {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </SessionProvider>
  );
}
