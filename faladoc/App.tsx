import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Colors } from './src/assets/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";

import StartSimpleScreen from './src/screens/StartSimpleScreen/StartSimpleScreen';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const StackNavigator: React.FC = () => (
<StackNavigator/>
);


function App() {

return(
<NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name='Splash Screen' component={StartSimpleScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='SignInScreen' component={SignInScreen}/>
        
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
);

}

export default App;

