import React, { useState, useContext } from "react";
import { View, Image, Pressable, Keyboard } from "react-native";
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { PasswordInput } from "../../components/PasswordInput";
import SessionContext from "../../provider/sessionContext";
import axios from "axios";
import { apiHandler } from "../../api";
import { ResetPasswordModal } from "../../components/ResetPasswordModal";
import AppText from "../../components/AppText";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setDoctorInfo } = useContext(SessionContext);
  const [passwordResetModal, setPasswordResetModal] = useState(false);

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("Por gentileza, insira seu email");
      setEmailError(true);
      return;
    } 
    if (!password.trim()) {
      setError("Por gentileza, insira sua senha");
      setPasswordError(true);
      return;
    }
    try {
      const response = await apiHandler('/login', 'POST', 'application/json',  JSON.stringify({email, password}));
      if (response.status !== 200) {
        throw new Error("Falha ao realizar o login");
      }

      const { id, name, crm } = response.data.doctor;
      const { token } = response.data;
      localStorage.setItem("token", token);
      setDoctorInfo({ id, name, crm });

      navigation.navigate("Home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Credenciais inválidas.");
        setPasswordError(true)
        setEmailError(true)
      } else {
        setError("Erro ao processar a requisição");
      }
      console.error(error);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError && text.trim()) {
      setError("");
      setEmailError(false);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError && text.trim()) {
      setError("");
      setPasswordError(false);
    }
  };
  

  return (
    <Pressable className="bg-lightGreen h-full relative" onPress={handleScreenPress}>
      <ResetPasswordModal navigation={navigation} modalVisible={passwordResetModal} setModalVisible={setPasswordResetModal} />
      <Image
        source={require("../../assets/splash.png")}
        className="w-36 h-36 mx-7 absolute top-7 self-center"
      />
      <Pressable className="flex-1 bg-background mt-48 rounded-t-[30px] pt-12 h-full" onPress={handleScreenPress}>
        <AppText className="mb-5 text-[40px] text-subtitle leading-48 text-left ml-8">
          Login
        </AppText>
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
            onChangeText={handlePasswordChange}
          />
          {error ? (
            <AppText className="text-invalid mb-6">{error}</AppText>
          ) : null}
          <AppText
            className="text-lightGreen underline cursor-pointer my-2 mb-3"
            onPress={() =>
              setPasswordResetModal(true)
            } 
          >
            Esqueci minha senha
          </AppText>
          <EnterButton
            onPress={handleLogin}
            text="Entrar"
          />
          <AppText className="text-subtitle mt-3 mb-1">Não possui conta? </AppText>
          <AppText
            className="text-lightGreen underline cursor-pointer"
            onPress={() => navigation.navigate("Register")}
          >
            Cadastre-se
          </AppText>
        </View>
      </Pressable>
    </Pressable>
  );
}