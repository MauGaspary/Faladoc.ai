import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import { SessionProvider } from "./provider/sessionContext";

// Import Screens
import StartSimpleScreen from './screens/StartSimpleScreen/StartSimpleScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import LoginScreen from './screens/Login/LoginScreen';
import ConsultaAndamentoScreen from "./screens/ConsultaAndamento/ConsultaAndamentoScreen";
import IniciarNovaConsultaScreen from './screens/IniciarNovaConsulta/IniciarNovaConsultaScreen';
import ProcessandoConsultaScreen from "./screens/ProcessandoConsulta/ProcessandoConsultaScreen";
import PasswordResetScreen from './screens/PasswordResetScreen/PasswordResetScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

// Import Components
import { AddPatientModal } from './components/AddPatientModal';

// Import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import CSS
import { NativeWindStyleSheet } from 'nativewind';

import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'react-native-gesture-handler';


enableScreens();

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Redefinir Senha" component={PasswordResetScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Iniciar nova Consulta" component={IniciarNovaConsultaScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Consulta Andamento" component={ConsultaAndamentoScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Processando Consulta" component={ProcessandoConsultaScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Simple Screen" component={StartSimpleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="Cadastro" component={RegisterScreen} />
  </Stack.Navigator>
);

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
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
