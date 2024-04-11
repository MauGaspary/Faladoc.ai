import React from "react";
import { View } from "react-native";
import { MyContextProvider } from "./provider/AudioContext";
import ConsultaAndamento from "./src/screens/ConsultaAndamento";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <MyContextProvider>
      <View className="flex-1 items-center justify-center bg-background">
        <View className="flex flex-row items-center bg-white">
          <ConsultaAndamento/>
        </View>
      </View>
    </MyContextProvider>
  );
}
