import { EvilIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Input from "./Input";

type ResetPasswordModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export function ResetPasswordModal({
  modalVisible,
  setModalVisible,
}: ResetPasswordModalProps) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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
    
    
    // axios
    //   .post("https://api.faladoc.com/patient", {
    //     email: email,
    //   })
    //   .then((response) => {
    //     setSuccessModalVisible(true);
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
        animationType="none"
        transparent={true}
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
          <Pressable
            onPress={() => {
              handleSubmit();
            }}
            className={`bg-[#12ADB4] text-white w-[80%] items-center p-2 rounded ${
              email.length === 0 ? "opacity-50" : ""
            }`}
          >
            Recuperar senha
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <View className="flex self-center border-[1px] rounded-[15px] border-lightGreen my-auto bg-white w-[80%] p-5">
          <View className="items-center gap-7">
            <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
              <FontAwesome5 name="check-circle" size={60} color="white" />
            </View>
            <Text className="text-lg text-center font-bold opacity-30">
              Email enviado com sucesso!
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={failModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
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
