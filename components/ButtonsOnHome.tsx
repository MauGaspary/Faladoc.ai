import { Text, View, Pressable } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';
import AppText from "./AppText";



const ButtonsOnHome =({ size ,onPress,icon,text}: any)=> {
 if(size=="full") return (
    <View className="h-32 w-full m-2 ">
      <Pressable onPress={onPress} className="rounded-lg py-6 bg-timer flex-row items-center justify-center" >
        <AppText className=" text-white text-2xl font-semibold mr-3">{text}</AppText>
        <Ionicons name={icon} size={60} color="white"/> 
      </Pressable>
    </View>
  );
  else return(
    <View>
      <Pressable onPress={onPress} className="rounded-lg justify-center w-[152px] h-32 bg-timer items-center" >
        <Ionicons name={icon} size={60} color="white"/>       
        <AppText className="text-white text-2xl font-semibold">{text}</AppText>
      </Pressable>
    </View>
  )
}

export default ButtonsOnHome;