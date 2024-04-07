import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

import { styles } from "./styles";

type props = {
  name: String;
};

export function HomeButton({ name }: props) {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Feather name="home" size={70} color="white" />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
