import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { PasswordInput } from "../../components/PasswordInput";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      setError("Por gentileza, insira seu email");
      setEmailError(true);
      return;
    }
    // task de integração front/back tela de login
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError && text.trim()) {
      setError("");
      setEmailError(false);
    }
  };

  return (
    <View className="bg-lightGreen h-full relative">
      <Image
        source={require("../../assets/splash.png")}
        className="w-36 h-36 mx-7 absolute top-7 self-center"
      />
      <View className="flex-1 bg-background mt-48 rounded-t-[30px] pt-12 h-full">
        <Text className="mb-5 text-[40px] text-subtitle leading-48 text-left ml-8">
          Login
        </Text>
        <View className="items-center px-8">
          <Input
            iconName={"person-outline"}
            placeholder={"Email"}
            value={email}
            onChangeText={handleEmailChange}
          />
          <PasswordInput
            mode="login"
            getPassword={(password) => setPassword(password)}
          />
          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}
          <Text
            className="text-lightGreen underline cursor-pointer my-2"
            onPress={() =>
              console.log("Button pressed")
            } /* irá navegar para a tela (ou modal) da solicitação de redefinição de senha */
          >
            Esqueci minha senha
          </Text>
          <EnterButton
            onPress={
              handleLogin
            } /* chama a função handleLogin após a lógica da mesma implementada */
            text="Entrar"
          />
          <Text className="text-subtitle">Não possui conta? </Text>
          <Text
            className="text-lightGreen underline cursor-pointer"
            onPress={() =>
              console.log("Button pressed")
            } /* irá navegar para a tela de cadastro posteriormente */
          >
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
}
