// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, Pressable, Keyboard } from "react-native";
import { AppointmentCard } from "../../components/AppointmentCard";
import { FiltersComponent } from "../../components/FiltersComponent";

import Navbar from "../../components/Navbar";
import SessionContext from "../../provider/sessionContext";
import axios from "axios";
import AppText from "../../components/AppText";

interface Patient {
  id: string;
  date_of_birth: string;
  name: string;
  cpf: string;
}

const ListPatientsScreen = ({ navigation }: any) => {
  const [appointments, setAppointments] = useState<Patient[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Patient[]>([]);
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
        `http://3.22.75.73:3000/patients/doctor/${doctorInfo.id}`
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
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  };
  const handleFilter = () => {
    const normalizedSearchTerm = normalizeString(searchTerm.toLowerCase());
    const filtered = appointments.filter((patient) => {
      const normalizedPatientName = normalizeString(
        patient.name.toLowerCase()
      );
      const matchesName = normalizedPatientName.includes(normalizedSearchTerm);

      return matchesName;
    });

    setFilteredAppointments(filtered);
  };

  return (
    <Pressable className="h-full" onPress={handleScreenPress}>
    <View className="flex-1 pt-4 bg-background">
      <AppText className="text-2xl text-#505050-700 p-10 text-center">
        Listagem de Pacientes
      </AppText>
      <View className="items-center">
        <FiltersComponent
            enableNameFilter={true} 
            enableDateFilter={false} 
            onFilter={(term, date) => {
              setSearchTerm(term);
              setSearchDate(date);
            }}
        />
      </View>
      <ScrollView className="px-4 mt-3 w-full h-80">
        <View className="flex items-center justify-center h-full">
          {filteredAppointments.map((patient, index) => (
            <Pressable
              className="items-center w-full"
              key={index}
              onPress={() =>
                navigation.navigate("ListRecords", { id: patient.id })
              }
            >
              <AppointmentCard
                type="pacient"
                pacientName={patient.name}
                date={patient.date_of_birth}
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

export default ListPatientsScreen;
