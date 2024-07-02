// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, Pressable,Keyboard} from "react-native";
import { AppointmentCard } from "../../components/AppointmentCard";
import { FiltersComponent } from "../../components/FiltersComponent";

import Navbar from "../../components/Navbar";
import SessionContext from "../../provider/sessionContext";
import axios from "axios";
import AppText from "../../components/AppText";

interface Appointment {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_context: string;
  appointment_date: string;
  duration: number;
  hospital: string;
  appointment_status: string;
  patient: {
    id: string;
    date_of_birth: string;
    name: string;
    cpf: string;
  };
}

const ListChartsScreen = ({ navigation }: any) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const { doctorInfo } = useContext(SessionContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, searchDate, appointments]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://3.22.75.73:3000/appointments?doctor_id=${doctorInfo.id}`
      );
      const data = await response.data;
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  const handleFilter = () => {
    const normalizedSearchTerm = normalizeString(searchTerm.toLowerCase());
    const filtered = appointments.filter((appointment) => {
      const normalizedPatientName = normalizeString(
        appointment.patient.name.toLowerCase()
      );
      const matchesName = normalizedPatientName.includes(normalizedSearchTerm);
      const matchesDate = searchDate
        ? appointment.appointment_date ===
          searchDate.toISOString().split("T")[0]
        : true;
      return matchesName && matchesDate;
    });

    setFilteredAppointments(filtered);
  };

  return (
    <Pressable className="h-full" onPress={handleScreenPress}>
    <View className="flex-1 pt-4 bg-background">
      <AppText className="text-2xl text-#505050-700 p-10 text-center">
        Listagem de Prontuários
      </AppText>
      <View className= "items-center">
        <FiltersComponent
            enableNameFilter={true} 
            enableDateFilter={true} 
            onFilter={(term, date) => {
              setSearchTerm(term);
              setSearchDate(date);
            }}
        />
      </View>
      <ScrollView className="px-4 mt-3 w-full h-90">
        <View className="flex items-center justify-center h-full">
          {filteredAppointments.map((appointment, index) => (
            <Pressable
              className="items-center w-full"
              key={index}
              onPress={() =>
                navigation.navigate("ViewChart", { id: appointment.id })
              }
            >
              <AppointmentCard
                type="prontuario"
                pacientName={appointment.patient.name}
                date={appointment.appointment_date}
                location={appointment.location}
                status={appointment.appointment_status}
                context={appointment.appointment_context}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Navbar />
    </View>
    </Pressable>
  );
};

export default ListChartsScreen;
