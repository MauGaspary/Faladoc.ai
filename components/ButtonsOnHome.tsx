import { Text, View, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';



const ButtonsOnHome =({ size ,onPress,icon,text}: any)=> {
 if(size==1) return (
    <View className="h-28 w-full border-x-8 border-trasparent">
      <TouchableOpacity onPress={onPress} className="h-28 rounded-lg bg-[#12ADB4] flex flex-row justify-center" >
        <Text className="mt-8 mr-2 text-center text-white text-2xl font-semibold">{text}</Text>
        <Ionicons name={icon} size={50} color="white" className="mt-8"/> 
      </TouchableOpacity>
    </View>
  );
  else return(
    <View className="h-28 border-x-8 border-trasparent">
      <TouchableOpacity onPress={onPress} className="h-28 w-36 rounded-lg bg-[#12ADB4] flex flex-col justify-center" >
        <Ionicons name={icon} size={50} color="white" className="ml-6"/> 
        <Text className="text-center text-white text-2xl ">{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonsOnHome;
