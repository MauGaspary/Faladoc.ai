import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import { SessionProvider } from "./provider/sessionContext";


//import Screens
import StartSimpleScreen from './screens/StartSimpleScreen/StartSimpleScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import ConsultaAndamento from "./screens/ConsultaAndamento/ConsultaAndamentoScreen";


//import Components
import { AddPatientModal } from './components/AddPatientModal';

//import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



//import CSS
import { NativeWindStyleSheet } from 'nativewind';
import ConsultaAndamentoScreen from './screens/ConsultaAndamento/ConsultaAndamentoScreen';
import IniciarNovaConsultaScreen from './screens/IniciarNovaConsultaScreen/IniciarNovaConsultaScreen';





const Stack = createStackNavigator();

const StackNavigator: React.FC = () => (
  <StackNavigator/>
  );


NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (

    <SessionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name='Iniciar nova Consulta' component={IniciarNovaConsultaScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='Consulta Andamento' component={ConsultaAndamentoScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='Simple Screen' component={StartSimpleScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='SignInScreen' component={SignInScreen}/>
          
          
          {/* Add more screens here */}
          
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>


  );
}
