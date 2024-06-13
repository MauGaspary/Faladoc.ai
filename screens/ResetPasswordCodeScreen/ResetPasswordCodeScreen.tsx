import {
  Image,
  View,
  Text,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from "react-native";

import CodeInput from "../../components/CodeInput";
import { useEffect, useState } from "react";

export default function ResetPasswordCodeScreen({ navigation }: any) {

  const [code, setCode] = useState<string>("");

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  
  useEffect(() => {
    if (code.length === 4) {
      handleLogin();   
    }
  }, [code]);

  const pullCode = (data: string[]) => {
    if (data[3] !== "") {
      setCode(data.join(""));
    }
  };

  const handleLogin = () => {
    // Chamada para o back para verificar se o código é válido
    console.log("Código válido");
    navigation.navigate(`ResetPassword`, { code: code });
  };

  return (
    <Pressable className="h-full" onPress={handleScreenPress}>
      <View className="flex-1 flex-col items-center justify-between px-4 py-8 bg-lightGreen">
        <Image
          source={require("../../assets/splash.png")}
          className="w-36 h-36"
        />
        <View className="items-center">
          <Text className="text-3xl text-white text-center">
            Preencha o código enviado por email
          </Text>
          <View className="space-x-6 my-16">
            <CodeInput pullCode={pullCode} key={Math.random()} />
          </View>
        </View>
        <View className="justify-end h-36">
          <View className="flex-row justify-center">
            <Text className="text-lg text-white">Não recebeu o código?</Text>
            <Text
              className="ml-2 text-lg text-background underline"
              onPress={() => console.log("Reenviar")}
            >
              Reenviar
            </Text>
          </View>
          <View className="flex-row justify-center">
            <Text
              onPress={() => navigation.navigate("Login")}
              className="text-lg text-white underline"
            >
              Voltar
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
