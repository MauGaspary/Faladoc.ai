import React from "react";
import { View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import Navbar from "./components/navbar/Navbar";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <View>
      <Navbar />
    </View>
  );
}
