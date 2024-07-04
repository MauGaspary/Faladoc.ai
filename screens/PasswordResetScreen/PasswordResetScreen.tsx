import React, { useState } from "react";
import { View, Text, Image, Keyboard, Pressable } from "react-native";
import EnterButton from "../../components/EnterButton";
import { PasswordInput } from "../../components/PasswordInput";
import AppText from "../../components/AppText";
import { useRoute } from "@react-navigation/native";
import api from "../../api";

export default function PasswordResetScreen({ navigation }: any) {
  const route = useRoute();
  const { code } = route.params as { code: string };
  const [newPassword, setNewPassword] = useState("");
  
  const handlePasswordReset = async () => {
    try {
      const response = await api.patch(`/users/${code}`, { password: newPassword });
      if (response.status !== 200) {
        throw new Error("Falha ao realizar o reset de senha");
      }

      navigation.navigate(`Login`);
    } catch (error) {
      console.error(error);
    }
  }
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  return (
    <Pressable className="h-full" onPress={handleScreenPress}>
    <View className="bg-lightGreen h-full relative">
      <Image source={require("../../assets/splash.png")} className="w-[150] h-[150] absolute top-[30px] self-center" />
      <View className="flex-1 bg-background mt-[200] rounded-t-[30px] pt-12 h-full">
        <AppText className="text-[40px] text-[#505050] leading-48 text-left ml-[30]">Redefinir senha</AppText>
        <View className="items-center mt-10 px-4">
          <PasswordInput mode="register" getPassword={setNewPassword} />
          <View className="w-3/4 p-0 my-3">
            <EnterButton
              onPress={() => {
                handlePasswordReset();
              }}
              text="Confirmar nova senha"
              />
          </View>
          <AppText>Não possui conta? </AppText>
          <AppText className="text-teal-600 underline cursor-pointer" onPress={() => {
            navigation.navigate("Register");
          } }>
            Cadastre-se
          </AppText>
        </View>
      </View>
    </View>
    </Pressable>
  );
}
