import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { SessionProvider } from "./provider/sessionContext";


//import Screens
import LoginScreen from  './screens/Login/LoginScreen';
import ConsultaAndamentoScreen from "./screens/ConsultaAndamento/ConsultaAndamentoScreen";
import HomeScreen from './screens/HomeScreen/HomeScreen';
import IniciarNovaConsultaScreen from './screens/IniciarNovaConsulta/IniciarNovaConsultaScreen';
import ProcessandoConsultaScreen from "./screens/ProcessandoConsulta/ProcessandoConsultaScreen";
import PasswordResetScreen from './screens/PasswordResetScreen/PasswordResetScreen';



//import CSS
import { NativeWindStyleSheet } from 'nativewind';
import { enableScreens } from 'react-native-screens';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ResetPasswordCodeScreen from './screens/ResetPasswordCodeScreen/ResetPasswordCodeScreen';
import ListFeedbackScreen from './screens/ListFeedbackScreen/ListFeedbackScreen';
import ViewChart from './screens/ViewChart/ViewChart';


enableScreens();



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
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='Cadastro' component={RegisterScreen}/>

          <Stack.Screen name="ResetPasswordCode" component={ResetPasswordCodeScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='Iniciar nova Consulta' component={IniciarNovaConsultaScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='Listagem Prontuarios' component={ListFeedbackScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='Visualizar Prontuario' component={ViewChart} options={{ headerShown: false }}/>
          
          <Stack.Screen name="ResetPassword" component={PasswordResetScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='Consulta Andamento' component={ConsultaAndamentoScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='Processando Consulta' component={ProcessandoConsultaScreen} options={{ headerShown: false }}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>


  );
}