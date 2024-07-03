import { View, Text } from "react-native";
import AppText from "./AppText";

interface AppointmentCardProps {
  type: string;
  pacientName: string;
  date: string;
  location: string;
  status: string;
  context?: string;
}

// types = ['prontuario', 'paciente']
// status = ['APPROVED', 'ERROR', 'WAITING_APPROVAL', 'PROCESSING']

export function AppointmentCard({
  type,
  date,
  pacientName,
  location,
  context,
  status,
}: AppointmentCardProps) {
  let color = "";
  switch (status) {
    case "APPROVED":
      color = "border-green-400";
      break;
    case "ERROR":
      color = "border-red-400";
      break;
    case "WAITING_APPROVAL":
      color = "border-yellow-400";
      break;
    case "PROCESSING":
      color = "border-zinc-400";
      break;
  }

  return (
    <>
      {type == "prontuario" ? (
        <View
          className={`bg-white w-full h-24 py-2 px-4 rounded-md shadow-sm mb-4 border-r-[16px] ${color}`}
        >
          <AppText numberOfLines={1} className="text-lg font-bold  text-gray-900 space-y-4">
            {pacientName} - {date}
          </AppText>
          <AppText numberOfLines={1} className="text-gray-700 line-clamp-1 space-y-4">{context}</AppText>
          <AppText numberOfLines={1} className="text-timer font-semibold space-y-4">{location}</AppText>
        </View>
      ) : (
        type == "paciente" && (
          <View
            className={`bg-white w-full h-24 py-2 px-4 rounded-md shadow-sm mb-4 border-r-[16px] ${color}`}
          >
            <AppText numberOfLines={1} className="text-lg font-bold text-gray-900 space-y-4">
              {pacientName}
            </AppText>
            <AppText numberOfLines={1} className="text-gray-700 space-y-4">
              Ultima consulta - {date}
            </AppText>
            <AppText numberOfLines={1} className="text-timer font-semibold space-y-4">{location}</AppText>
          </View>
        )
      )}
    </>
  );
} 