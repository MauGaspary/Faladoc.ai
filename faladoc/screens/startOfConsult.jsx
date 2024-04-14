import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConsultButton from './components/homeButton';
import Input from './components/input';
import { Ionicons } from '@expo/vector-icons';
import NewPatient from './components/newPatient';


export default function App() {
  return (
    <View style={styles.container}>
      <NewPatient/>
      <Text>ou</Text>
      <Text>pesquise pelo nome</Text>
      <Input iconName={"person"} placeholder={"Nome do Paciente"} />
      <View style={styles.line} />
      <Input iconName={"location-sharp"} placeholder={"Local da consulta"} />
      <Input iconName={"list-outline"} placeholder={"Contexto da Consulta"} />
      <ConsultButton onPress={undefined}></ConsultButton>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0EFF0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100, 
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#069696',
    width: '80%', 
    marginHorizontal: '5%', 
    marginBottom: 10, 
  },
});
