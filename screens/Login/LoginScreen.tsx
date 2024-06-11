import React, { useState, useContext } from "react";
import { View, Text, Image } from "react-native";
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { PasswordInput } from "../../components/PasswordInput";
import SessionContext from "../../provider/sessionContext";
import axios from "axios";


export default function LoginScreen({navigation}:any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const { setDoctorInfo } = useContext(SessionContext);

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("Por gentileza, insira seu email");
      setEmailError(true);
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/login`,
        { email, password }
      );
      if (response.status !== 200) {
        throw new Error("Falha ao realizar o login");
      }

      const { id, name, crm, state } = response.data.doctor;
      setDoctorInfo({ id, name, crm, state });

      console.log('Login realizado com sucesso!');
      navigation.navigate("Home"); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Erro desconhecido");
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
  
  return (
    <View style={{ backgroundColor: "#069696", height: "100%", position: "relative" }}>
      <Image
        source={require("../../assets/splash.png")}
        style={{ width: 144, height: 144, marginHorizontal: 28, position: 'absolute', top: 28, alignSelf: 'center' }}
      />
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", marginTop: 192, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 48, height: "100%" }}>
        <Text style={{ marginBottom: 20, fontSize: 40, color: "#264653", textAlign: 'left', marginLeft: 32 }}>
          Login
        </Text>
        <View style={{ alignItems: 'center', paddingHorizontal: 32 }}>
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
            onPress={handleLogin}          
            text="Entrar"
          />
          <Text style={{ color: "#264653" }}>Não possui conta? </Text>
          <Text
            style={{ color: "#2A9D8F", textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate("Cadastro")}
          >
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
}
