import { View } from "react-native";
import { PasswordInput } from "../../components/PasswordInput";

export default function teste() {
  return (
    <View className="my-auto">
      <PasswordInput mode="register" getPassword={() => {}} />
    </View>
  )
}