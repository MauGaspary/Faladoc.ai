import React, { useState } from 'react';
//import CSS
import { NativeWindStyleSheet } from 'nativewind';
import { PasswordInput } from './components/PasswordInput';
import { Button, View } from 'react-native';


const StackNavigator: React.FC = () => (
  <StackNavigator/>
  );


NativeWindStyleSheet.setOutput({
  default: "native",
});



export default function App() {
  const [getPassword, setGetPassword] = useState<string>('');

  const defPassword = (password: string) => {
    setGetPassword(password);
  }

  const handleClick = () => {
    console.log(getPassword);
  };

  return (
    <>
      <View className="my-auto">
        <PasswordInput mode="login" getPassword={defPassword} />
        <Button onPress={handleClick} title="Login" />
      </View>
    </>
  );
}
