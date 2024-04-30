import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { PasswordInput } from "../../components/PasswordInput";

export default function PasswordResetScreen() {
  const [teste, setTeste] = useState("");
  return (
    <View className="bg-lightGreen h-full relative">
      <Image source={require("../../assets/splash.png")} className="w-[150] h-[150] absolute top-[30px] self-center" />
      <View className="flex-1 bg-background mt-[200] rounded-t-[30px] pt-12 h-full">
        <Text className="text-[40px] text-[#505050] leading-48 text-left ml-[30]">Redefinir senha</Text>
        <View className="items-center mt-[100]">
          <PasswordInput mode="register" getPassword={setTeste} />
          <View className="w-3/4 p-0 my-3">
            <EnterButton
              onPress={() => {
                console.log("teste" + teste);
              }}
              text="Entrar"
            />
          </View>
          <Text>Não possui conta? </Text>
          <Text className="text-link underline cursor-pointer" onPress={() => {}}>
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
}
