import React, { useState } from "react";
import { KeyboardAvoidingView, TextComponent, View } from "react-native"
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { ScrollView } from "react-native-gesture-handler";
import HomeButton from "../../components/Homebutton";
import { PasswordInput } from "../../components/PasswordInput";
import { Text } from "react-native-svg";

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
    <KeyboardAvoidingView className="flex-1 bg-background mt-[150] rounded-t-[30px] pt-12 max-w-full">
        <ScrollView className="w-full max-w-full">
            
            <View className="flex-row w-max">
            <Input iconName={''} placeholder={"ESTADO"}/>
            <Input iconName={''} placeholder={"CRM"}/>
            </View>
            <View className="border-b-2 border-teal-600 w-4/5 my-2" />
            <Input iconName={'mail-outline'} placeholder={'Hospital'} className={'px-15'}/>
            <Input iconName={'mail-outline'} placeholder={'EMAIL'}  value={email}   onChangeText={setEmail}/>
            <PasswordInput mode="register"  getPassword={getPassword}/>    
            <EnterButton onPress={()=>console.log('click')} text="Cadastrar"/>
            <text className="flex-1 justify-center items-center">ja possui uma conta?</text>
            
        </ScrollView>       
    </KeyboardAvoidingView>
    );
}
export default RegisterScreen;