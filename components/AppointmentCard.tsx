import { View, Text } from "react-native";
import AppText from "./AppText";

interface AppointmentCardProps {
  type: string;
  pacientName: string;
  date: string;
  hospital: string;
  status: string;
  context?: string;
}

// types = ['prontuario', 'paciente']
// status = ['APPROVED', 'ERROR', 'WAITING_APPROVAL', 'PROCESSING']

export function AppointmentCard({
  type,
  date,
  pacientName,
  hospital,
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
          className={`bg-white w-full h-24 py-2 px-4 rounded-md shadow-sm mb-4 border-r-[1rem]${color}`}
        >
          <AppText className="text-lg font-bold text-[1.125rem] text-gray-900 line-clamp-1">
            {pacientName} - {date}
          </AppText>
          <AppText className="text-gray-700 text-[1rem] line-clamp-1">{context}</AppText>
          <AppText className="text-timer font-semibold line-clamp-1 ">{hospital}</AppText>
        </View>
      ) : (
        type == "paciente" && (
          <View
            className={`bg-white w-full h-24 py-2 px-4 rounded-md shadow-sm mb-4 border-r-[1rem] ${color}`}
          >
            <AppText className="text-lg font-bold text-[1.125rem] text-gray-900 line-clamp-1 ">
              {pacientName}
            </AppText>
            <AppText className="text-gray-700 text-[1rem] line-clamp-1 ">
              Ultima consulta - {date}
            </AppText>
            <AppText className="text-timer font-semibold line-clamp-1 ">{hospital}</AppText>
          </View>
        )
      )}
    </>
  );
}
