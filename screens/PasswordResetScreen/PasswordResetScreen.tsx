import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import EnterButton from "../../components/EnterButton";
import { PasswordInput } from "../../components/PasswordInput";

export default function PasswordResetScreen({ navigation }: any) {
  const [newPassword, setNewPassword] = useState("");
  return (
    <View className="bg-lightGreen h-full relative">
      <Image source={require("../../assets/splash.png")} className="w-[150] h-[150] absolute top-[30px] self-center" />
      <View className="flex-1 bg-background mt-[200] rounded-t-[30px] pt-12 h-full">
        <Text className="text-[40px] text-[#505050] leading-48 text-left ml-[30]">Redefinir senha</Text>
        <View className="items-center mt-10 px-4">
          <PasswordInput mode="register" getPassword={setNewPassword} />
          <View className="w-3/4 p-0 my-3">
            <EnterButton
              onPress={() => {
                navigation.navigate("Login");
              }}
              text="Confirmar nova senha"
            />
          </View>
          <Text>Não possui conta? </Text>
          <Text className="text-teal-600 underline cursor-pointer" onPress={() => {
            navigation.navigate("Cadastro");
          } }>
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
}
