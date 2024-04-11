import React from "react";
import { View } from "react-native";
import { MyContextProvider } from "./provider/AudioContext";
import ConsultaAndamento from "./src/screens/ConsultaAndamento";

export default function App() {
  return (
    <MyContextProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <View className="flex flex-row items-center">
          <ConsultaAndamento />
        </View>
      </View>
    </MyContextProvider>
  );
}
