import React from 'react';
//import CSS
import { NativeWindStyleSheet } from 'nativewind';
import { PasswordInput } from './components/PasswordInput';
import { View } from 'react-native';


const StackNavigator: React.FC = () => (
  <StackNavigator/>
  );


NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (
    <>
    {/* <View className="flex items-center my-auto"> */}
      <PasswordInput mode="register"/>

    {/* </View> */}
    </>



  );
}
