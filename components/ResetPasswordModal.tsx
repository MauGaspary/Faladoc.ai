import { EvilIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, Text, View, ModalProps } from "react-native";
import Input from "./Input";
import EnterButton from "./EnterButton";

type ResetPasswordModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: any;
};

export function ResetPasswordModal({
  modalVisible,
  setModalVisible,
  navigation
}: ResetPasswordModalProps) {
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");

  const handleSubmit = () => {
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setEmailValid("error");
      return;
    }

    setEmailValid("");
    setEmail("");
    setModalVisible(false);
    
    navigation.navigate("ResetPasswordCode");
    
    
    // axios
    //   .post("https://api.faladoc.com/patient", {
    //     email: email,
    //   })
    //   .then((response) => {
    //     setTimeout(() => {
    //       setFailModalVisible(false);
    //       setModalVisible(false);
    //     }, 5000);
    //   })
    //   .catch((error) => {
    //     setFailModalVisible(true);
    //     setTimeout(() => {
    //       setFailModalVisible(false);
    //     }, 5000);
    //   });
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex justify-center relative items-center self-center rounded-2xl border-lightGreen border-2 my-auto bg-white w-[80%] p-8">
          <Pressable
            className="absolute top-3 right-3"
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <EvilIcons name="close" size={24} color="black" />
          </Pressable>
          <Text className="text-2xl mb-4">Esqueci minha senha</Text>
          <Text className="text-lg mb-2">Insira seu email</Text>
          <Input
            value={email}
            onChangeText={setEmail}
            variant={emailValid}
            iconName="mail-outline"
            placeholder="Email"
          />
          <EnterButton
            onPress={handleSubmit}          
            text="Recuperar senha"
          />
        </View>
      </Modal>
      
      <Modal
        animationType="none"
        transparent={true}
        visible={failModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="flex self-center border-[1px] rounded-[15px] border-lightGreen my-auto bg-white w-[80%] p-5">
          <View className="items-center gap-7">
            <View className="bg-invalid rounded-full w-[70px] h-[70px] justify-center items-center">
              <FontAwesome name="close" size={60} color="white" />
            </View>
            <Text className="text-lg text-center font-bold opacity-30">
              Problema no envio de email
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
