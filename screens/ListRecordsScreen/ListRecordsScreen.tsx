import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { AppointmentCard } from "../../components/AppointmentCard";
import { View, Text, FlatList, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SessionContext from "../../provider/sessionContext";

// http://3.22.75.73:3000/appointments?doctor_id=${doctorInfo.id}&patient_id=${patient.id}
interface RecordsProps {
  id: string;
  appointment_date: string;
  patient: {
    id: string;
    name: string;
  };
  appointment_context: string;
  appointment_hospital: string;
  appointment_status: string;
}

export default function ListRecordsScreen() {
  const [records, setRecords] = useState<RecordsProps[]>([]);
  const [searchDate, setSearchDate] = useState("");
  const { doctorInfo, patientInfo } =
  useContext(SessionContext);

  async function getRecords(doctorId: string, patientId: string, date: string) {
    try {
      // const res = await axios.get(`http://3.22.75.73:3000/appointments?doctor_id=${doctorInfo.id}&patient_id=${patientInfo.id}`);
      const res = await axios.get(`http://3.22.75.73:3000/appointments`);
      setRecords(res.data);
    } catch (error) {
      console.log(error);
      setRecords([]); // Em caso de erro, limpa os registros
    }
  }

  // Chamada inicial para obter registros
  useEffect(() => {
    getRecords(doctorInfo.id, patientInfo.id, "");
  }, []);

  // Atualiza os registros cada vez que o filtro muda
  useEffect(() => {
    if (searchDate) {
      getRecords(doctorInfo.id, patientInfo.id, searchDate);
    }
  }, [searchDate]);

  return (
    <View className="h-full items-center bg-background pt-10">
      <Text className="text-3xl text-center">Prontuarios de {patientInfo.name}</Text>
      <View className="bg-white w-3/4 mt-7 flex-row items-center border-2 border-lightGreen rounded-full p-2">
        <AntDesign name="calendar" size={24} color="black" />
        <TextInput className="w-full py-2" placeholder="Buscar por data (YYYY-MM-DD)" value={searchDate} onChangeText={setSearchDate} />
      </View>
      <View className="w-2/3 flex items-center mx-auto mt-10">
        <FlatList
          className="w-full"
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              key={item.id}
              date={item.appointment_date}
              pacientName={item.patient.name}
              context={item.appointment_context}
              specialty={item.appointment_hospital} // Verifique se esta propriedade está correta
              status={item.appointment_status}
              type="prontuario"
            />
          )}
          ListEmptyComponent={<Text>Loading...</Text>}
        />
      </View>
      <Navbar />
    </View>
  );
}
