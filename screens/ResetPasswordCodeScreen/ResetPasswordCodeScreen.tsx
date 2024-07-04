import {
  Image,
  View,
  Text,
  Keyboard,
  Pressable,
} from "react-native";

import CodeInput from "../../components/CodeInput";
import { useEffect, useState } from "react";
import AppText from "../../components/AppText";
import api from "../../api";

export default function ResetPasswordCodeScreen({ navigation }: any) {

  const [code, setCode] = useState<string>("");

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  
  useEffect(() => {
    if (code.length === 4) {
      handleCode();
    }
  }, [code]);

  const pullCode = (data: string[]) => {
    if (data[3] !== "") {
      setCode(data.join(""));
    }
  };

  const handleCode = async () => {
    // Chamada para o back para verificar se o código é válido
    try {
      const response = await api.get(`/passwordReset/${code}`);
      if (response.status !== 200) {
        throw new Error("Falha ao realizar o reset de senha");
      }

      navigation.navigate(`ResetPassword`, { code: code });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable className="h-full" onPress={handleScreenPress}>
      <View className="flex-1 flex-col items-center justify-between px-4 py-8 bg-lightGreen">
        <Image
          source={require("../../assets/splash.png")}
          className="w-36 h-36"
        />
        <View className="items-center">
          <AppText className="text-3xl text-white text-center">
            Preencha o código enviado por email
          </AppText>
          <View className="space-x-6 my-16">
            <CodeInput pullCode={pullCode} key={Math.random()} />
          </View>
        </View>
        <View className="justify-end h-36">
          <View className="flex-row justify-center">
            <AppText className="text-lg text-white">Não recebeu o código?</AppText>
            <AppText
              className="ml-2 text-lg text-background underline"
              // onPress={() => console.log("Reenviar")}
            >
              Reenviar
            </AppText>
          </View>
          <View className="flex-row justify-center">
            <AppText
              onPress={() => navigation.navigate("Login")}
              className="text-lg text-white underline"
            >
              Voltar
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
