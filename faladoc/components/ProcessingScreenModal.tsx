import { useState, useEffect, useContext } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import MaskInput from "react-native-mask-input";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";
import SessionContext from "../provider/sessionContext";

export function ProcessingScreenModal(this: any) {
    const [failModalVisible, setFailModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    try {
        // const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/patients`, patient);
        const response = await axios.post(`http://localhost:3000/patients`, patient);
        if (response.status !== 201) {
          throw new Error("Failed to create patient");
        }
        setSuccessModalVisible(true);
      } catch (error) {
        console.error(error);
      }


    function falha(){
        <Modal
            animationType="none"
            transparent={true}
            visible={failModalVisible}
            onRequestClose={() => {
            setFailModalVisible(false);
            }}
        >
            <View className="flex self-center border-[1px] rounded-[15px] border-lightGreen my-auto bg-white w-[80%] p-5">
            <View className="items-center gap-7">
                <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
                <FontAwesome5 name="check-circle" size={60} color="white" />
                </View>
                <Text className="text-lg text-center font-bold opacity-30">Erro no processamento!</Text>
            </View>
            </View>
        </Modal>
    }



    useEffect(() => {
        if (successModalVisible) {
        setTimeout(() => {
            setSuccessModalVisible(false);
        }, 2500);
        }
    }, [successModalVisible]);

    function sucesso(){
        <Modal
            animationType="none"
            transparent={true}
            visible={successModalVisible}
            onRequestClose={() => {
            setSuccessModalVisible(false);
            }}
        >
            <View className="flex self-center border-[1px] rounded-[15px] border-red my-auto bg-white w-[80%] p-5">
            <View className="items-center gap-7">
                <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
                <FontAwesome5 name="exclamation-triangle" size={60} color="white" />
                </View>
                <Text className="text-lg text-center font-bold opacity-30">Consulta Processada com Sucesso!</Text>
            </View>
            </View>
        </Modal>
    }
    


}