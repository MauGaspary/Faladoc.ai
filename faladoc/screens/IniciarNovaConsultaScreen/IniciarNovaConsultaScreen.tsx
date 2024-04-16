import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Input from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';
import StartConsultationButton from '../../components/StartConsultationButton';
import { AddPatientModal } from '../../components/AddPatientModal';
import Navbar from "../../components/Navbar";



const IniciarNovaConsultaScreen = ({navigation}:any) => {


  const [NomePaciente, setNomePaciente] = useState('');
  const [LocalConsulta, setLocalConsulta] = useState('');
  const [ContextoConsulta, setContextoConsulta] = useState('');

  const isInputsFilled = NomePaciente.length >= 2 && LocalConsulta.length >= 2 && ContextoConsulta.length >= 2;


  const StartNewAppointment = () => {
    if (isInputsFilled) {
      navigation.navigate('Consulta Andamento');
    } else {
      alert('Por favor, preencha os campos com pelo menos duas letras.');
    }
  };


  return (
    
    <KeyboardAvoidingView className='flex-1'>
      <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
    <View className='flex-1 bg-[#D0EFF0] items-center justify-center pt-12'>
      
      <AddPatientModal/>
      <Text className="mt-2">ou</Text>
      <Text className="mt-2">pesquise pelo nome</Text>
      <Input iconName={"person"} placeholder={"Nome do Paciente"} value={NomePaciente} onChangeText={setNomePaciente}/>

      <View className="border-b-2 border-teal-600 w-4/5 my-2" />

      <Input iconName={"location-sharp"} placeholder={"Local da consulta"} value={LocalConsulta} onChangeText={setLocalConsulta}/>

      <Input iconName={"list-outline"} placeholder={"Contexto da Consulta"} value={ContextoConsulta} onChangeText={setContextoConsulta} />
      
      <View className='pt-2'>

      <StartConsultationButton onPress={StartNewAppointment} />

      </View>
      

      <StatusBar style="auto" />
      
    </View>
    </ScrollView>
    <Navbar/>
    </KeyboardAvoidingView>

  );
}

export default IniciarNovaConsultaScreen;
