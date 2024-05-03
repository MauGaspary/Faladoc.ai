import React, { useEffect, useState } from "react";

import { Text, View } from "react-native";
import { TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

type PasswordInputProps = {
  mode: 'login' | 'register';
  getPassword: (e:string) => void;
};

export function PasswordInput({ mode, getPassword }: PasswordInputProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const passwordValidations = [
    { rule: "A senha deve conter no mínimo 8 caracteres.", isValid: password.length >= 8 },
    { rule: "Deve conter ao menos um caractere especial.", isValid: /\d/.test(password) },
    { rule: "Deve conter ao menos um número.", isValid: /\W/.test(password) },
    { rule: "As senhas não coincidem.", isValid: password === confirmPassword && confirmPassword.length > 0 },
  ];

  useEffect(() => {
    getPassword(password);
  }, [password]);

  return (
    <View className="w-full flex items-center">
      <View className="flex-row border-2 border-lightGreen w-full rounded-full justify-between p-3 m-3 bg-white">
        <View className="flex-row items-center gap-2">
          <Feather name="lock" size={24} color="black" />
          <TextInput secureTextEntry={hidePassword} onChangeText={setPassword} placeholder="Senha" className="text-subtitle ml-2" placeholderTextColor="gray"/>
        </View>
        <Feather
          name={hidePassword ? "eye-off" : "eye"}
          size={24}
          color="black"
          onPress={() => setHidePassword(!hidePassword)}
        />
      </View>
      {mode === "register" && (
        <>
          <View className="justify-start">
            {passwordValidations.map(({ rule, isValid }, index) => (
              <View key={index} className={`flex-row justify-start`}>
                <Feather name={isValid ? "check" : "x"} size={16} color={isValid ? "green" : "red"} />
                <Text className={`${isValid ? "text-green-500" : "text-red-500"} text-[10px]`}>{rule}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row border-2 border-lightGreen w-full rounded-full justify-between p-3 m-3 bg-white">
            <View className="flex-row items-center gap-2">
              <Feather name="lock" size={24} color="black" />
              <TextInput
                secureTextEntry={hidePassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmar senha"
                className="ml-2 text-subtitle"
              />
            </View>
            <Feather
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="black"
              onPress={() => setHidePassword(!hidePassword)}
            />
          </View>
        </>
      )}
    </View>
  );
}
