import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { AppointmentCard } from "../../components/AppointmentCard";
import { View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SessionContext from "../../provider/sessionContext";

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

export default function ListRecordsScreen() {
  const [rawRecords, setRawRecords] = useState<RecordsProps[]>([]);
  const [records, setRecords] = useState<RecordsProps[]>([]);
  const [searchDate, setSearchDate] = useState("");
  const { doctorInfo, patientInfo } = useContext(SessionContext);

  async function getRecords(doctorId: string, patientId: string) {
    try {
      const url = `http://3.22.75.73:3000/appointments?doctor_id=${doctorId}&patient_id=${patientId}`;
      const res = await axios.get(url);
      setRawRecords(res.data); // Atualiza rawRecords com os dados recebidos
    } catch (error) {
      setRawRecords([]); // Em caso de erro, limpa os registros
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

  // Chamada inicial para obter registros
  useEffect(() => {
    getRecords(doctorInfo.id, patientInfo.id);
  }, []);

  // Filtra os registros sempre que rawRecords ou searchDate mudam
  useEffect(() => {
    filterRecordsByDate();
  }, [rawRecords, searchDate]);

  function formatarData(valor: string) {
    // Remove caracteres não numéricos e adiciona "-" automaticamente
    const onlyDigits = valor.replace(/\D/g, '');
    let formatted = onlyDigits;
    if (onlyDigits.length > 4) {
      formatted = `${onlyDigits.slice(0, 4)}-${onlyDigits.slice(4)}`;
    }
    if (onlyDigits.length > 6) {
      formatted = `${onlyDigits.slice(0, 4)}-${onlyDigits.slice(4, 6)}-${onlyDigits.slice(6)}`;
    }
    return formatted.slice(0, 10); // Limita a 10 caracteres (YYYY-MM-DD)
  }

  return (
    <View className="h-full bg-background pt-10">
      <Text className="text-3xl text-center">Prontuarios de {patientInfo.name}</Text>
      <View className="bg-white self-center w-3/4 mt-7 flex-row items-center border-2 border-lightGreen rounded-full p-2">
        <AntDesign name="calendar" size={24} color="black" />
        <TextInput
          className="w-full py-2"
          placeholder="Buscar por data (YYYY-MM-DD)"
          value={searchDate}
          onChangeText={(text) => setSearchDate(formatarData(text))}
          keyboardType="numeric" // Garante que apenas o teclado numérico seja exibido
        />
      </View>
      <View className="w-full flex items-center mx-auto mt-10">
        <FlatList
          className="w-5/6"
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              key={item.id}
              date={item.appointment_date}
              pacientName={item.patient.name}
              context={item.appointment_context}
              location={item.hospital}
              status={item.appointment_status}
<<<<<<< HEAD
              type="prontuario"
=======
              type="chart"
>>>>>>> 76d2cc307ea1940a873521eaf403bc672b42f742
            />
          )}
          ListEmptyComponent={<ActivityIndicator size="large" />}
        />
      </View>

      <Navbar />
    </View>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 76d2cc307ea1940a873521eaf403bc672b42f742
