import { FlatList, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const data = [
  {
    name: "João Vicente",
    cpf: "123.456.789-00",
  },
  {
    name: "Arthur Machado",
    cpf: "987.654.321-00",
  },
  {
    name: "Eduardo Franco",
    cpf: "456.789.123-00",
  },
  {
    name: "Eduarda Silva",
    cpf: "321.654.987-00",
  },
  {
    name: "Maria Eduarda",
    cpf: "654.987.321-00",
  },
  {
    name: "João Silva",
    cpf: "987.321.654-00",
  },
  {
    name: "João Pedro",
    cpf: "321.654.987-00",
  },
  { 
    name: "João Paulo",
    cpf: "654.987.321-00",
  },
  {
    name: "João Lucas",
    cpf: "987.321.654-00",
  }
];

export function FilterInput() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data
    .filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 3); // Only take the first 3 items

  return (
    <View className="border rounded-[30px] py-2 px-4 flex-col items-center border-[#069696]">
        <View className="flex flex-row">
        <AntDesign name="user" size={24} color="black" className="mr-2" />
        <TextInput
          className="flex-grow"
          placeholder="Pesquisar paciente..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        </View>
      
      <View>
      {searchTerm !== '' && (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="bg-blue">
              <Text>Name: {item.name}</Text>
              <Text>CPF: {item.cpf}</Text>
            </View>
          )}
        />
      )}
      </View>
    </View>
  );
}