import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import HomeButtons from "../../components/ButtonsOnHome";
import Navbar from "../../components/Navbar";
import { PasswordInput } from "../../components/PasswordInput";
import axios from "axios";

export default function HomeScreen({ navigation }: any) {
  useEffect(() => {
    getProcessingAppointments();
  }, []);

  const getProcessingAppointments = async () => {
    try {
      // const res = await axios.patch(`http://localhost:3000/appointments/${appointment_id}`, body)
      const res = await axios.get(
        `http://localhost:3000/appointments?appointment_status=PROCESSING`
      );
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="bg-background h-full">
      <View className="mx-11 mt-8">
        <Text className="mb-2 mt-8 text-2xl text-timer leading-48 text-left">
          Olá, <Text className="text-timer font-bold">Murilo </Text>
        </Text>
        <Text className="mb-5 text-2xl text-timer font-semibold leading-48 text-left">
          CRM <Text className="text-timer font-semibold"> 12345</Text>
        </Text>
      </View>
      <View className="items-center mx-11">
        <HomeButtons
          text="Nova consulta"
          icon="mic-outline"
          size="full"
          onPress={() => {
            navigation.navigate("Iniciar nova Consulta");
          }}
        ></HomeButtons>
        <View className="items-center w-full">
          <View className="flex-row w-full justify-between">
            <HomeButtons
              text="Prontuários"
              icon="document-outline"
              onPress={() => {}}
            />
            <HomeButtons
              text="Pacientes"
              icon="person-outline"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View className="mx-11 mt-7">
        <Text className="text-subtitle text-base font-semibold">
          Consultas em processamento
        </Text>
        <ScrollView className="mt-3 w-full h-80">
          <View className="flex items-center justify-center">
            <View
              className={`bg-white w-full py-2 px-4 rounded-md shadow-sm mb-4 mt-2 border-r-[1rem]`}
            >
              <Text className="text-lg font-bold text-[1.125rem] text-gray-900">
                Murilo - 11/11/1111
              </Text>
              <Text className="text-gray-700 text-[1rem]">
                Consulta de Rotina
              </Text>
              <Text className="text-timer font-semibold">Clínico Geral</Text>
            </View>
            <View
              className={`bg-white w-full py-2 px-4 rounded-md shadow-sm mb-4 mt-2 border-r-[1rem]`}
            >
              <Text className="text-lg font-bold text-[1.125rem] text-gray-900">
                Murilo - 11/11/1111
              </Text>
              <Text className="text-gray-700 text-[1rem]">
                Consulta de Rotina
              </Text>
              <Text className="text-timer font-semibold">Clínico Geral</Text>
            </View>
            <View
              className={`bg-white w-full py-2 px-4 rounded-md shadow-sm mb-4 mt-2 border-r-[1rem]`}
            >
              <Text className="text-lg font-bold text-[1.125rem] text-gray-900">
                Murilo - 11/11/1111
              </Text>
              <Text className="text-gray-700 text-[1rem]">
                Consulta de Rotina
              </Text>
              <Text className="text-timer font-semibold">Clínico Geral</Text>
            </View>
            <View
              className={`bg-white w-full py-2 px-4 rounded-md shadow-sm mb-4 mt-2 border-r-[1rem]`}
            >
              <Text className="text-lg font-bold text-[1.125rem] text-gray-900">
                Murilo - 11/11/1111
              </Text>
              <Text className="text-gray-700 text-[1rem]">
                Consulta de Rotina
              </Text>
              <Text className="text-timer font-semibold">Clínico Geral</Text>
            </View>
            <View
              className={`bg-white w-full py-2 px-4 rounded-md shadow-sm mb-4 mt-2 border-r-[1rem]`}
            >
              <Text className="text-lg font-bold text-[1.125rem] text-gray-900">
                Murilo - 11/11/1111
              </Text>
              <Text className="text-gray-700 text-[1rem]">
                Consulta de Rotina
              </Text>
              <Text className="text-timer font-semibold">Clínico Geral</Text>
            </View>
          </View>
        </ScrollView>
      </View> 
    <Navbar/>
    </View>
  );
}
