import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { AppointmentCard } from "../../components/AppointmentCard";
import { View } from "react-native";
import AppText from "../../components/AppText";

// http://3.22.75.73:3000/appointments?doctor_id=${doctorInfo.id}&patient_id=${patient.id}
interface RecordsProps {
  appointment_data: string;
  patient: {
    id: string;
    name: string;
  };
  appointment_context: string;
  specialty: string;
  appointment_status: string;
  type: string;
}

export default function ListRecordsScreen() {
  const [records, setRecords] = useState<RecordsProps[]>();
  async function getRecords() {
    try {
      const res = await axios.get(`http://3.22.75.73:3000/appointments`);
      return res;
    } catch (error) {
      console.log(error);
      return { data: [] }; // return a default value
    }
  }

  useEffect(() => {
    getRecords().then((res) => {
      setRecords(res.data);
    });
  }, []);

  async function getDoctorSpecialty() {
    try {
      const res = axios.get(`http://3.22.75.73:3000/doctors`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View className="w-3/4 flex items-center mx-auto mt-10">
        {records ? (
          records.map((record, id) => (
            <AppointmentCard
              key={id}
              date={record.appointment_data}
              pacientName={record.patient.name}
              context={record.appointment_context}
              specialty={record.specialty}
              status={record.appointment_status}
              type={record.type}
            />
          ))
        ) : (
          <AppText>Loading...</AppText>
        )}
        {/* <AppointmentCard
        date={record.appointment_data}
        pacientName={record.patient.name}
        context={record.appointment_context}
        specialty={record.specialty}
        status={record.appointment_status}
        type={record.type}
      /> */}
      </View>
      <Navbar />
    </>
  );
}
