import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

import { styles } from "./styles";
import Navigation from "../navigation/Navigation";

type props = {
  name: String;
};

const HomeButton =({ name ,onPress}: any)=> {
  return (
    <View className="w-full px-4">
      <TouchableOpacity onPress={onPress} className="w-full h-full rounded-lg bg-teal-600 flex items-center justify-center p-4" >
        <Feather name="home" size={70} color="white" />
        <Text className="mt-3 text-center text-white text-lg">{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeButton;
