import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

//import Screens
import StartSimpleScreen from './screens/StartSimpleScreen/StartSimpleScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';

//import Components
import { AddPatientModal } from './components/AddPatientModal';

//import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



//import CSS
import { NativeWindStyleSheet } from 'nativewind';





const Stack = createStackNavigator();

const StackNavigator: React.FC = () => (
  <StackNavigator/>
  );


NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (

    
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name='Splash Screen' component={StartSimpleScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='SignInScreen' component={SignInScreen}/>
        
        {/* Add more screens here */}
        
      </Stack.Navigator>
    </NavigationContainer>


  );
}

