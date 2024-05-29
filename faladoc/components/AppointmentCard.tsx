import { View, Text } from "react-native";

export function AppointmentCard() {
  return (
    <View className="bg-white w-5/6 py-2 px-4 rounded-md shadow-sm mb-4 border-r-[1rem] border-green-500">
      <Text className="text-lg font-bold text-[1.125rem] text-gray-900">Jorge Ferreira - 22/04/24</Text>
      <Text className="text-gray-700 text-[1rem]">Consulta de Rotina</Text>
      <Text className="text-timer font-semibold">Clinico Geral</Text>
    </View>
  );
}
