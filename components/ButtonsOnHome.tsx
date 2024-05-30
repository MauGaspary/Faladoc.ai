import { Text, View, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';



const ButtonsOnHome =({ size ,onPress,icon,text}: any)=> {
 if(size=="full") return (
    <View className="h-28 max-w-full m-2 ">
      <TouchableOpacity onPress={onPress} className="h-28 rounded-lg bg-[#12ADB4] flex-row items-center" >
        <Text className=" ml-12 text-white text-2xl font-semibold">{text}</Text>
        <Ionicons name={icon} size={50} color="white"/> 
      </TouchableOpacity>
    </View>
  );
  else return(
    <View className="h-28 m-2">
      <TouchableOpacity onPress={onPress} className="h-28 w-40 rounded-lg bg-[#12ADB4] items-center" >
        <Ionicons name={icon} size={50} color="white"/> 
        <Text className="text-white text-2xl">{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonsOnHome;
