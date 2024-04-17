import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

import { styles } from "./styles";
import Navigation from "../navigation/Navigation";

type props = {
  name: String;
};

const HomeButton =({ name ,onPress}: any)=> {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button} >
        <Feather name="home" size={70} color="white" />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeButton;
