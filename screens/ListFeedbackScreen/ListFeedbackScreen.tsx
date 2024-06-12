import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AppointmentCard } from '../../components/AppointmentCard';
import { FiltersComponent } from "../../components/FiltersComponent";

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

const ListFeedbackScreen = ({ navigation }: any) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchDate, setSearchDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, searchDate, appointments]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/appointments');
      const data = await response.json();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const handleFilter = () => {
    const normalizedSearchTerm = normalizeString(searchTerm.toLowerCase());
    const filtered = appointments.filter(appointment => {
      const normalizedPatientName = normalizeString(appointment.patient.name.toLowerCase());
      const matchesName = normalizedPatientName.includes(normalizedSearchTerm);
      const matchesDate = searchDate ? appointment.appointment_date === searchDate.toISOString().split('T')[0] : true;
      return matchesName && matchesDate;
    });

    setFilteredAppointments(filtered);
  };

  return (
    <View className='flex-1 items-center pt-4 bg-background'>
      <Text className="text-2xl text-#505050-700 p-10">
        Listagem de Prontuários
      </Text>
      <FiltersComponent 
        onFilter={(term, date) => {
          setSearchTerm(term);
          setSearchDate(date);
        }}
      />
      <ScrollView className='pt-4 w-full'>
        {filteredAppointments.map((appointment, index) => (
          <TouchableOpacity  className='items-center w-full' onPress={() => navigation.navigate('Visualizar Prontuario')} /* Passar id do prontuario*/ >
          <AppointmentCard 
            type="prontuario" 
            pacientName={appointment.patient.name}
            date={appointment.appointment_date}
            specialty="Cardiologia" 
            status={appointment.appointment_status}
            context={appointment.appointment_context}
          />
        </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListFeedbackScreen;
