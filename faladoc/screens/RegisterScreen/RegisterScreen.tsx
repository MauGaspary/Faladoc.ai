import React, { useState } from "react";
import { KeyboardAvoidingView, View, Text } from "react-native"
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { ScrollView } from "react-native-gesture-handler";
import HomeButton from "../../components/Homebutton";
import { PasswordInput } from "../../components/PasswordInput";
import {  } from "react-native-svg";

const RegisterScreen = () => {

    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [estado, setEstado] = useState("")
    const [crm, setCRM] = useState("")
    const getPassword = (newPassword:string) => {
        setPassword(newPassword)
    }
    console.log(password)
    console.log(email)
    return(
    <KeyboardAvoidingView className="flex-1 bg-background mt-[150] rounded-t-[30px] pt-2 max-w-full">
        <ScrollView className="pb-8">
            <Text className="text-[40px] text-[#505050] leading-48 text-left ml-[30]">Cadastro</Text>
            <View className="flex-1 bg-[#D0EFF0] items-center justify-center">
                <View className="flex-row w-max flex align-bottom">
                <Input iconName={''} placeholder={"ESTADO"} value={estado}    onChangeText={setEstado}/>
                <Input iconName={''} placeholder={"CRM"} value={crm}    onChangeText={setCRM}/>
                </View>
                <View className="border-b-2 border-teal-600 w-4/5 my-2" />
                <Input iconName={'mail-outline'} placeholder={'Hospital'} className={'px-15'}/>
                <Input iconName={'mail-outline'} placeholder={'EMAIL'}  value={email}   onChangeText={setEmail}/>
                <PasswordInput mode="register"  getPassword={getPassword}/>    
                <EnterButton onPress={()=>console.log('click')} text="Cadastrar"/>
                <Text>Ja possui uma conta?</Text>
            </View>
        </ScrollView>       
    </KeyboardAvoidingView>
    );
}
export default RegisterScreen;