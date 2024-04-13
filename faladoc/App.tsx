import React from "react";
import { View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { FilterInput } from "./components/FilterInput";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
      <View className="flex-1 items-center justify-center bg-background">
        <View className="flex flex-row items-center bg-white">
          <FilterInput />
        </View>
      </View>
  );
}
