import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const statesOfBrazil = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", 
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", 
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", 
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", 
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];



const DropdownStates = ({ iconName, placeholder, selectedValue, onValueChange }:any) => {
  return (
    <View className="w-full flex-row items-center border-2 rounded-full p-2 my-2 bg-white border-lightGreen">
      <Ionicons name={iconName} size={24} color="black" className="ml-2" />
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ flex: 1, marginLeft: 8 }}
        mode="dropdown"
      >
        <Picker.Item label={placeholder} value="" />
        {statesOfBrazil.map((state, index) => (
          <Picker.Item key={index} label={state} value={state} />
        ))}
      </Picker>
    </View>
  );
};

export default DropdownStates;
