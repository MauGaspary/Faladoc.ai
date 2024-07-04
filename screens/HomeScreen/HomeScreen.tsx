import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import SessionContext from "../../provider/sessionContext";
import HomeButtons from "../../components/ButtonsOnHome";
import Navbar from "../../components/Navbar";
import { AppointmentCard } from "../../components/AppointmentCard";
import axios from "axios";
import AppText from "../../components/AppText";

export default function HomeScreen({ navigation }: any) {
  const [appointments, setAppointments] = useState([]);
  const { doctorInfo } = useContext(SessionContext);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `http://3.22.75.73:3000/appointments?doctor_id=${doctorInfo.id}&appointment_status=PROCESSING`
      );
      setAppointments(res.data);
    } catch (error) {

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
        <AppText className="mb-2 mt-4 text-2xl leading-48 text-left">
          Olá, <AppText className="font-bold">{doctorInfo.name}</AppText>
        </AppText>
        <AppText className="mb-5 text-2xl font-semibold leading-48 text-left">
          CRM <AppText className="font-semibold">{doctorInfo.crm}</AppText>
        </AppText>
      </View>

      <View className="items-center mx-11">
        <HomeButtons
          text="Nova consulta"
          icon="mic-outline"
          size="full"
          onPress={() => {
            navigation.navigate("StartNewAppointment");
          }}
        ></HomeButtons>
        <View className="items-center w-full">
          <View className="flex-row w-full justify-between">
            <HomeButtons
              text="Prontuários"
              icon="document-outline"
              onPress={() => navigation.navigate("ListCharts")}
            />
            <HomeButtons
              text="Pacientes"
              icon="person-outline"
              onPress={() => navigation.navigate("ViewPatients")}
            />
          </View>
        </View>
      </View>
      <View className="mx-11 mt-7">
        <AppText className="text-subtitle text-base font-semibold">
          Prontuários em processamento
        </AppText>
        <ScrollView className="mt-3 w-full h-80">
          <View className="flex items-center justify-center h-full">
            {appointments.length === 0 ? (
              <AppText className="text-base text-subtitle mt-24">
                Não foram encontradas consultas
              </AppText>
            ) : (
              appointments.map((appointment: any, index: number) => (
                <View key={index} style={{ width: "100%" }}>
                  <Pressable
                    className="items-center w-full"
                    key={index}
                    onPress={() =>
                      navigation.navigate("ViewChart", { id: appointment.id })
                    }
                  >
                    <AppointmentCard
                      type="chart"
                      pacientName={getFirstAndLastName(
                        appointment.patient.name
                      )}
                      date={formatDate(appointment.appointment_date)}
                      specialty={appointment.hospital}
                      status={appointment.appointment_status}
                      context={appointment.appointment_context}
                    />
                  </Pressable>
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
