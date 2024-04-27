import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Input from "../../components/Input";

export default function LoginScreen() {
  return (
    <View className="bg-lightGreen h-full relative">
      <Image
        source={require("../../assets/splash.png")}
        className="w-[150] h-[150] absolute top-[30px] self-center"
      />
      <View className="flex-1 bg-background mt-[200] rounded-t-[30px] pt-12 h-full">
        <Text className="text-[40px] text-[#505050] leading-48 text-left ml-[30]">
          Login
        </Text>
      </View>
    </View>
  );
}
