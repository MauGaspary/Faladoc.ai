import React, { useState } from "react";
import { KeyboardAvoidingView, View, Text, TouchableHighlight } from "react-native"
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { ScrollView } from "react-native-gesture-handler";
import HomeButton from "../../components/Homebutton";
import { PasswordInput } from "../../components/PasswordInput";
import {  } from "react-native-svg";
import axios from "axios";

const RegisterScreen = ({navigation}:any) => {

    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [estado, setEstado] = useState("")
    const [crm, setCRM] = useState("")
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const getPassword = (newPassword:string) => {
        setPassword(newPassword)
    }


    const handleRegister = async () => {
        if (!email.trim()) {
          setError("Por gentileza, insira seu email");
          setEmailError(true);
          return;
        }
        console.log(name, email, password, crm);
        try {
            const response = await axios.post('http://localhost:3000/doctors', {
              name, email, password, crm
            });
            if (response.status !== 200) {
              throw new Error("Falha ao registrar");
            }
            console.log('Registro realizado com sucesso!');
            navigation.navigate("Login");  
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setError(error.response?.data.message || "Erro desconhecido");
            } else {
              setError("Erro ao processar a requisição");
            }
            console.error(error);
          }
        };



    return(
    <KeyboardAvoidingView className="flex-1 bg-background rounded-t-[30px] pt-2 max-w-full px-4">
        <ScrollView className="pb-8">
            <Text className="text-[40px] text-[#505050] leading-48 text-left ml-[30]">Cadastro</Text>
            <View className="flex-1 bg-[#D0EFF0] items-center justify-center">
                <View className="w-full">

                <Input className="w-full mb-3" iconName={'medkit-outline'} placeholder={"ESTADO"} value={estado}    onChangeText={setEstado}/>
                <Input className="w-full !m-0" iconName={'medkit-outline'} placeholder={"CRM"} value={crm}    onChangeText={setCRM}/>

                </View>
                <View className="border-b-2 border-teal-600 w-4/5 my-2" />

                <Input iconName={'person-outline'} placeholder={'Nome'} className={'px-15'} onChangeText={setName}/>
                <Input iconName={'mail-outline'} placeholder={'EMAIL'}  value={email}   onChangeText={setEmail}/>

                <PasswordInput mode="register"  getPassword={getPassword}/>    
                <EnterButton onPress={()=>handleRegister()} text="Cadastrar"/>
                <Text>Ja possui uma conta?</Text>

                <TouchableHighlight onPress={() => navigation.navigate("Login")}>
                        <Text className={"underline text-teal-600"}>Entre</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>       
    </KeyboardAvoidingView>
    );
}
export default RegisterScreen;