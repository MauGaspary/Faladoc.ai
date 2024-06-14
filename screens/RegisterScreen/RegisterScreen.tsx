import React, { useState } from "react";
import { KeyboardAvoidingView, View, Text, TouchableHighlight, ScrollView } from "react-native"
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import HomeButton from "../../components/Homebutton";
import { PasswordInput } from "../../components/PasswordInput";
import {  } from "react-native-svg";
import axios from "axios";
import Dropdown from "../../components/DropDown";

const RegisterScreen = ({navigation}:any) => {

    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [estado, setEstado] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [crm, setCRM] = useState("")
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const getPassword = (newPassword:string) => {
        setPassword(newPassword)
    }
   
    const handleRegister = async () => {
        if (!email.trim()) {
          setError("Por gentileza, insira seu email");
          setEmailError(true);
          return;
        }
        try {
            const response = await axios.post('http://3.22.75.73:3000/doctors', {
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
    <KeyboardAvoidingView className="bg-background rounded-t-[30px] pt-2 max-w-full px-3">
        <ScrollView className="pb-8">
            <Text className="text-[40px] text-[#505050] leading-48 text-left ml-[30] my-4">Cadastro</Text>
            <Text className="text-[20px] text-[#505050] leading-48 text-left font-semibold">Digite o CRM e o Estado de Registro</Text>
            <View className="bg-[#D0EFF0] items-center">
                <View className="w-full flex-row justify-center space-x-2">
                  <View className="w-2/5">
                    <Input iconName={'medical-outline'} placeholder={"CRM"} value={crm}    onChangeText={setCRM}/>
                  </View>
                  <View className="grow">
                    <Dropdown 
                      iconName="map-outline"
                      placeholder="ESTADO"
                      selectedValue={selectedState}
                      onValueChange={(itemValue: React.SetStateAction<string>) => setSelectedState(itemValue)}
                    />
                  </View>
                </View>
                <Input iconName={'person-outline'} placeholder={'Nome'} className={'px-15'} onChangeText={setSpeciality}/>
                <Input iconName={'medkit-outline'} placeholder={'Especialidade'} className={'px-15'} onChangeText={setSpeciality}/>
                <View className="border-b-2 border-teal-600 w-4/5 my-2" />

                <Input iconName={'business-outline'} placeholder={'Hospital'} className={'px-15'} onChangeText={setName}/>
                <Input iconName={'mail-outline'} placeholder={'Email'}  value={email}   onChangeText={setEmail}/>

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