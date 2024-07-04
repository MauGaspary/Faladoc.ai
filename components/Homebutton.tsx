import { Text, View, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';

import { styles } from "./styles";
import AppText from "./AppText";

type ButtonProps = {
  name: string;
  onPress: () => void;
  disabled?: boolean;
};

const HomeButton =({ name ,onPress, disabled }: ButtonProps)=> {
  const something = () => {
    
  }
  
  return (
    <View className="w-full px-4">
      <Pressable onPress={disabled ? something : onPress} className={`w-full rounded-lg ${disabled ? 'bg-slate-500' : 'bg-teal-600'} flex items-center justify-center p-4`} >
        <Feather name="home" size={70} color="white" />
        <AppText className="mt-3 text-center text-white text-lg">{name}</AppText>
      </Pressable>
    </View>
  );
}

export default HomeButton;
