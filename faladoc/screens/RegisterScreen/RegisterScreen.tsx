import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native"
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { ScrollView } from "react-native-gesture-handler";
import HomeButton from "../../components/Homebutton";
import { PasswordInput } from "../../components/PasswordInput";

const RegisterScreen = () => {

    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const getPassword = (newPassword:string) => {
        setPassword(newPassword)
    }
    console.log(password)
    console.log(email)
    return(
    <KeyboardAvoidingView className="flex-1 bg-background mt-[150] rounded-t-[30px] pt-12 h-full max-w-full">
        <ScrollView className="w-full max-w-full">
            <View className="flex-row w-max">
            <Input iconName={''} placeholder={"ESTADO"}/>
            <Input iconName={''} placeholder={"CRM"}/>
            </View>
            <Input iconName={''} placeholder={'Hospital'}/>
            <Input iconName={''} placeholder={'EMAIL'}  value={email}   onChangeText={setEmail}/>
            <PasswordInput mode="register"  getPassword={getPassword}/>    
            <EnterButton onPress={()=>console.log('click')} text="Cadastrar"/>
        </ScrollView>       
    </KeyboardAvoidingView>
    );
}
export default RegisterScreen;