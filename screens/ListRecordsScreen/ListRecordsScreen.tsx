import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { AppointmentCard } from "../../components/AppointmentCard";
import { View, Text, FlatList, TextInput, ActivityIndicator, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SessionContext from "../../provider/sessionContext";
import { useRoute } from "@react-navigation/native";

interface RecordsProps {
  id: string;
  appointment_date: string;
  patient: {
    id: string;
    name: string;
  };
  appointment_context: string;
  hospital: string;
  appointment_status: string;
}

export default function ListRecordsScreen({ navigation }: any) {
  const route = useRoute();
  const { id } = route.params as { id: string };
  
  const [rawRecords, setRawRecords] = useState<RecordsProps[]>([]);
  const [records, setRecords] = useState<RecordsProps[]>([]);
  const [searchDate, setSearchDate] = useState("");
  const { doctorInfo, patientInfo } = useContext(SessionContext);

  async function getRecords(doctorId: string) {
    try {
      const url = `http://3.22.75.73:3000/appointments?doctor_id=${doctorId}&patient_id=${id}`;
      const res = await axios.get(url);
      setRawRecords(res.data);
    } catch (error) {
      setRawRecords([]); 
    }
  }

  function filterRecordsByDate() {
    if (!searchDate) {
      setRecords(rawRecords);
    } else {
      const filtered = rawRecords.filter((record) => record.appointment_date.startsWith(searchDate));
      setRecords(filtered);
    }
  }

  useEffect(() => {
    getRecords(doctorInfo.id);
  }, []);

  useEffect(() => {
    filterRecordsByDate();
  }, [rawRecords, searchDate]);

  function formatarData(valor: string) {
    const onlyDigits = valor.replace(/\D/g, '');
    let formatted = onlyDigits;
    if (onlyDigits.length > 4) {
      formatted = `${onlyDigits.slice(0, 4)}-${onlyDigits.slice(4)}`;
    }
    if (onlyDigits.length > 6) {
      formatted = `${onlyDigits.slice(0, 4)}-${onlyDigits.slice(4, 6)}-${onlyDigits.slice(6)}`;
    }
    return formatted.slice(0, 10);
  }

  return (
    <View className="h-full bg-background pt-10">
      <Text className="text-3xl text-center">Prontuarios de {records[0]?.patient?.name}</Text>
      <View className="bg-white self-center w-3/4 mt-7 flex-row items-center border-2 border-lightGreen rounded-full p-2">
        <AntDesign name="calendar" size={24} color="black" />
        <TextInput
          className="w-full py-2"
          placeholder="Buscar por data (YYYY-MM-DD)"
          value={searchDate}
          onChangeText={(text) => setSearchDate(formatarData(text))}
          keyboardType="numeric"
        />
      </View>
      <View className="w-full flex items-center mx-auto mt-10">
        <FlatList
          className="w-5/6 h-96"
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              className="items-center w-full"
              key={item.id}
              onPress={() =>
                navigation.navigate("ViewChart", { id: item.id })
              }
            >
              <AppointmentCard
              key={item.id}
              date={item.appointment_date}
              pacientName={item.patient.name}
              context={item.appointment_context}
              location={item.hospital}
              status={item.appointment_status}
              type="chart"
            />
            </Pressable>
            
          )}
          ListEmptyComponent={<ActivityIndicator size="large" />}
        />
      </View>

      <Navbar />
    </View>
  );
}
