import React from 'react';
import { AppointmentCard } from '../../components/AppointmentCard';
import { View } from 'react-native';



const teste = () => {
  return (
    <View className='flex items-center mt-10'>
      <AppointmentCard type='prontuario' status="APPROVED" date="14/02/2024" context="Consulta de rotina" pacientName='Gabriel Rocha' specialty='Clinico Geral'/>
      <AppointmentCard type='prontuario' status="PROCESSING" date="5/03/2024" context="Dor de cabeça" pacientName='Maria Machado' specialty='Dermatologista'/>
      <AppointmentCard type='paciente' status="ERROR" date="28/05/2024" pacientName='Vicenzo Frusciante' specialty='Oftalmologista'/>
      <AppointmentCard type='paciente' status="WAITING_APPROVAL" date="5/07/2025" pacientName='Vicenzo Frusciante' specialty='Ortopedista'/>
    </View>
  );
};


export default teste;