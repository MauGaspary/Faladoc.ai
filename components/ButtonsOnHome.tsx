import { Text, View, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';



const ButtonsOnHome =({ size ,onPress,icon,text}: any)=> {
 if(size==1) return (
    <View className="w-full border-x-8 border-trasparent">
      <TouchableOpacity onPress={onPress} className="rounded-lg bg-teal-600 flex flex-row justify-center" >
        <Text className="mt-3 text-center text-white text-lg">{text}</Text>
        <Ionicons name={icon} size={70} color="white" />
      </TouchableOpacity>
    </View>
  );
  else return(
    <View>
      <TouchableOpacity onPress={onPress} className="w-2/3 h-3/6 rounded-lg bg-teal-600 flex items-center justify-center p-6" >
        <Ionicons name={icon} size={70} color="white" />
        <Text className="mt-3 text-center text-white text-lg">{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonsOnHome;
