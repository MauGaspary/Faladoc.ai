import { Text, View, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';



const ButtonsOnHome =({ size ,onPress,icon,text}: any)=> {
 if(size=="full") return (
    <View className="h-32 w-full m-2 ">
      <TouchableOpacity onPress={onPress} className="rounded-lg py-6 bg-timer flex-row items-center justify-center" >
        <Text className=" text-white text-2xl font-semibold mr-3">{text}</Text>
        <Ionicons name={icon} size={60} color="white"/> 
      </TouchableOpacity>
    </View>
  );
  else return(
    <View>
      <TouchableOpacity onPress={onPress} className="rounded-lg justify-center w-[152px] h-32 bg-timer items-center" >
        <Ionicons name={icon} size={60} color="white"/>       
        <Text className="text-white text-2xl font-semibold">{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonsOnHome;