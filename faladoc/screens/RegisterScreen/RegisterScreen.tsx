import React from "react";
import { KeyboardAvoidingView, View } from "react-native"
import Input from "../../components/Input";
import EnterButton from "../../components/EnterButton";
import { ScrollView } from "react-native-gesture-handler";

const RegisterScreen = () => {
    return(
    <KeyboardAvoidingView>
        <ScrollView className="" contentContainerStyle={{ flexGrow: 2 }}>
            <View className="flex-row">
            <Input iconName={''} placeholder={"ESTADO"}/>
            <Input iconName={''} placeholder={"CRM"}/>
            </View>
        
            <Input iconName={''} placeholder={'Hospital'}/>
            <Input iconName={''} placeholder={'EMAIL'}/>
        </ScrollView>       
    </KeyboardAvoidingView>
    );
}
export default RegisterScreen;