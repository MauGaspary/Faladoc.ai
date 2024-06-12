import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Modal, View, Text, Pressable } from "react-native";

interface CardProcessFeedbackProps {
  status: string;
}

export function CardProcessFeedback({ status }: CardProcessFeedbackProps) {
  const navigation = useNavigation();



  return (
    <View className="flex mt-10 bg-red-100 w-[100%] items-center justify-center h-full">
      {status === "success" ? (
        <Modal animationType="none" transparent={true} visible={true} className="">
          <Pressable onPress={handleModalPress}>
            <View className="flex border-[1px] rounded-[15px] border-lightGreen my-auto bg-white w-[80%] p-5">
              <View className="items-center gap-7">
                <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
                  <FontAwesome5 name="check-circle" size={60} color="white" />
                </View>
                <Text className="text-lg text-center font-bold opacity-30">Prontuario processado com sucesso!</Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      ) : status === "error" ? (
        <Modal animationType="none" transparent={true} visible={true} className="">
          <Pressable onPress={handleModalPress}>
            <View className="flex self-center border-[1px] rounded-[15px] border-lightRed my-auto bg-white w-[80%] p-5">
              <View className="items-center gap-7">
                <View className="bg-[#FF0000] rounded-full w-[70px] h-[70px] justify-center items-center">
                  <FontAwesome5 name="times-circle" size={60} color="white" />
                </View>
                <Text className="text-lg text-center font-bold opacity-30">
                  Ocorreu um erro ao processar o prontuario!
                </Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      ) : null}
    </View>
  );
}
