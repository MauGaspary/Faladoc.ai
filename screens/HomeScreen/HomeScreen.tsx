import React, { useState, useEffect, useContext} from "react";
import { View, Text, ScrollView } from "react-native";
import SessionContext from "../../provider/sessionContext";
import HomeButtons from "../../components/ButtonsOnHome";
import Navbar from "../../components/Navbar";
import { AppointmentCard } from "../../components/AppointmentCard";
import axios from "axios";

export default function HomeScreen({ navigation }: any) {
  const [appointments, setAppointments] = useState([]);
  const { doctorInfo } = useContext(SessionContext);

  useEffect(() => {
    getAppointments();
  }, []);
  
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/appointments?doctor_id=${doctorInfo.id}`
      );
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFirstAndLastName = (fullName: string): string => {
    const names = fullName.split(" ");
    if (names.length === 1) {
      return names[0];
    } else {
      const firstName = names[0];
      const lastName = names.pop();
      return `${firstName} ${lastName}`;
    }
  };  

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <View className="bg-background h-full">
      <View className="mx-11 mt-8">
  <Text className="mb-2 mt-8 text-2xl text-timer leading-48 text-left">
    Olá,{" "}
    <Text className="text-timer font-bold">{doctorInfo.name}</Text>
  </Text>
  <Text className="mb-5 text-2xl text-timer font-semibold leading-48 text-left">
    CRM <Text className="text-timer font-semibold">{doctorInfo.crm+'-'+doctorInfo.state}</Text>
  </Text>
</View>
      <View className="items-center mx-11">
        <HomeButtons
          text="Nova consulta"
          icon="mic-outline"
          size="full"
          onPress={() => {
            navigation.navigate("Iniciar nova Consulta");
          }}
        ></HomeButtons>
        <View className="items-center w-full">
          <View className="flex-row w-full justify-between">
            <HomeButtons
              text="Prontuários"
              icon="document-outline"
              onPress={() => {}}
            />
            <HomeButtons
              text="Pacientes"
              icon="person-outline"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View className="mx-11 mt-7">
        <Text className="text-subtitle text-base font-semibold">
          Consultas em processamento
        </Text>
        <ScrollView className="mt-3 w-full h-80">
          <View className="flex items-center justify-center h-full">
            {appointments.length === 0 ? (
              <Text className="text-base text-subtitle mt-24">Não foram encontradas consultas</Text>
            ) : (
              appointments.map((appointment: any, index: number) => (
                <View key={index} style={{ width: "100%" }}>
                  <AppointmentCard
                    type="prontuario"
                    pacientName={getFirstAndLastName(appointment.patient.name)}
                    date={formatDate(appointment.appointment_date)}
                    specialty={appointment.hospital}
                    status={appointment.appointment_status}
                    context={appointment.appointment_context}
                  />
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
      <Navbar />
    </View>
  );
}
