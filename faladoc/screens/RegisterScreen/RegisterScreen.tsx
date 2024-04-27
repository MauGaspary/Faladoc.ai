import React from "react";
import { KeyboardAvoidingView, View } from "react-native"
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { ScrollView } from "react-native-gesture-handler";
import HomeButton from "../../components/Homebutton";

const RegisterScreen = () => {

    

    return(
    <KeyboardAvoidingView className="flex-1 bg-background mt-[150] rounded-t-[30px] pt-12 h-full">
        <ScrollView className="" contentContainerStyle={{ flexGrow: 2 }}>
            <View className="flex-row">
            <Input iconName={''} placeholder={"ESTADO"}/>
            <Input iconName={''} placeholder={"CRM"}/>
            </View>
            <Input iconName={''} placeholder={'Hospital'}/>
            <Input iconName={''} placeholder={'EMAIL'}/>
            <EnterButton onPress={()=>console.log('click')} text="Cadastrar"/>
        </ScrollView>       
    </KeyboardAvoidingView>
    );
}
export default RegisterScreen;