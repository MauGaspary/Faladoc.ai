import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionProvider } from "./provider/sessionContext";
import * as Font from 'expo-font';



//import Screens
import LoginScreen from  './screens/Login/LoginScreen';
import OngoingAppointmentScreen from "./screens/OngoingAppointmentScreen/OngoingAppointmentScreen";
import HomeScreen from './screens/HomeScreen/HomeScreen';
import StartNewAppointmentScreen from './screens/StartNewAppointmentScreen/StartNewAppointmentScreen';
import ProcessingAppointmentScreen from "./screens/ProcessingAppointmentScreen/ProcessingAppointmentScreen";
import PasswordResetScreen from './screens/PasswordResetScreen/PasswordResetScreen';
import ListRecordsScreen from './screens/ListRecordsScreen/ListRecordsScreen';



//import CSS
import { NativeWindStyleSheet } from 'nativewind';
import { enableScreens } from 'react-native-screens';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ResetPasswordCodeScreen from './screens/ResetPasswordCodeScreen/ResetPasswordCodeScreen';
import ListChartsScreen from './screens/ListChartsScreen/ListChartsScreen';
import ViewChartScreen from './screens/ViewChartScreen/ViewChartScreen';


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
          
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}/>

          <Stack.Screen name="ResetPasswordCode" component={ResetPasswordCodeScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='StartNewAppointment' component={StartNewAppointmentScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='ListCharts' component={ListChartsScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='ViewChart' component={ViewChartScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name="ResetPassword" component={PasswordResetScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='OngoingAppointment' component={OngoingAppointmentScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='ProcessingAppointment' component={ProcessingAppointmentScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='ListRecords' component={ListRecordsScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>


  );
}