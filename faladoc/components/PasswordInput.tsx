import React, { useState } from "react";

import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

type PasswordInputProps = {
  mode: "login" | "register";
};

export function PasswordInput({ mode }: PasswordInputProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const passwordValidations = [
    { rule: "At least 8 characters", isValid: password.length >= 8 },
    { rule: "At least one number", isValid: /\d/.test(password) },
    // Add more password validation rules here...
  ];

  return (
    <View className="flex items-center">
      <View className="flex-row border-2 border-lightGreen w-2/3 rounded-full p-3 m-3 bg-white">
        <TextInput secureTextEntry={hidePassword} onChangeText={setPassword} placeholder="Password" />
        <Feather
          name={hidePassword ? "eye-off" : "eye"}
          size={24}
          color="black"
          onPress={() => setHidePassword(!hidePassword)}
        />
      </View>
      {mode === "register" && (
        <>
          {passwordValidations.map(({ rule, isValid }, index) => (
            <Text key={index} style={{ color: isValid ? "green" : "red" }}>
              {rule}
            </Text>
          ))}
          <TextInput
            className="flex-row border-2 border-lightGreen w-2/3 rounded-full p-3 m-3 bg-white"
            secureTextEntry={hidePassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
          />
          {password !== confirmPassword && <Text style={{ color: "red" }}>Passwords do not match</Text>}
        </>
      )}
    </View>
  );
}
