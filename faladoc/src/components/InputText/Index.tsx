import React  from "react";
import { View, TextInput, Image, ImageSourcePropType} from 'react-native';
import style from "./InputTextStyle";
import { Colors } from "../../assets/colors";

interface InputTextProps{
  onChangeText: (text: string) => void,
  isPassword: boolean,
  placeholder: string,
  text:string,
  icons:ImageSourcePropType 
}

const InputText = ({ onChangeText, isPassword = false, placeholder, text, icons }: InputTextProps) => {
  return (
    <View style={style.container}>
      <Image source={ icons } style={ style.icon } />
      <TextInput
        placeholderTextColor= {Colors.primary_blue}
        style={style.inputContainer} 
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
};

export default InputText;