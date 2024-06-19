import { Text, View, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';

import { styles } from "./styles";
import AppText from "./AppText";

type props = {
  name: String;
};

const HomeButton =({ name ,onPress}: any)=> {
  return (
    <View className="w-full px-4">
      <Pressable onPress={onPress} className="w-full h-full rounded-lg bg-teal-600 flex items-center justify-center p-4" >
        <Feather name="home" size={70} color="white" />
        <AppText className="mt-3 text-center text-white text-lg">{name}</AppText>
      </Pressable>
    </View>
  );
}

export default HomeButton;
