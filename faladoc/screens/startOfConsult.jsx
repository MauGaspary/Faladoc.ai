import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import ConsultButton from './components/homeButton';
import Input from './components/input';
import { Ionicons } from '@expo/vector-icons';
import NewPatient from './components/newPatient';


export default function App() {
  return (
    <View className='flex-1 bg-blue-200 items-center justify-center pt-14'>
      <NewPatient />
      <Text className="mt-2">ou</Text>
      <Text className="mt-2">pesquise pelo nome</Text>
      <Input iconName={"person"} placeholder={"Nome do Paciente"} />
      <View className="border-b-2 border-teal-600 w-4/5 my-2" />
      <Input iconName={"location-sharp"} placeholder={"Local da consulta"} />
      <Input iconName={"list-outline"} placeholder={"Contexto da Consulta"} />
      <ConsultButton onPress={undefined} />
      <StatusBar style="auto" />
    </View>
  );
}
