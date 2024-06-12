// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, Platform } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons"; // Adicionado MaterialIcons para o ícone de limpar
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type FiltersComponentType = {
  onFilter: (searchTerm: string, searchDate: Date | null) => void;
};

export function FiltersComponent({ onFilter }: FiltersComponentType) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    onFilter(searchTerm, searchDate);
  }, [searchTerm, searchDate]);

  const handleDateChange = (date: Date | null) => {
    setSearchDate(date);
  };

  const handleDateInputChange = (text: string) => {
    if (!text) {
      setSearchDate(null);
    } else {
      const [day, month, year] = text.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        setSearchDate(date);
      }
    }
  };

  const clearDate = () => {
    setSearchDate(null);
  };

  return (
    <View className="border rounded-[30px] py-3 px-4 mb-3 w-11/12 flex-col items-center bg-white z-10">
      <View className="flex flex-row items-center w-full">
        <View className="flex-row items-center w-2/4 border-r">
          <AntDesign name="search1" size={24} color="black" className="mr-2" />
          <TextInput
            className="flex ml-2 text-gray w-3/4"
            placeholder="Buscar por nome"
            placeholderTextColor="gray"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <View className="flex-row items-center w-2/4 pl-2">
          {Platform.OS === 'web' ? (
            <View className="flex-row items-center w-full">
              <DatePicker
                selected={searchDate}
                onChange={(date) => handleDateChange(date as Date)}
                customInput={
                  <View className="flex-row items-center w-full">
                    <AntDesign name="calendar" size={24} color="black" className="ml-2" />
                    <TextInput
                      className="flex ml-2 text-gray w-3/4"
                      value={searchDate ? searchDate.toLocaleDateString('pt-BR') : ""}
                      placeholder="Buscar por data"
                      placeholderTextColor="gray"
                      onChangeText={handleDateInputChange}
                    />
                    {searchDate && (
                      <TouchableOpacity onPress={clearDate}>
                        <MaterialIcons name="clear" size={24} color="black" className="ml-2" />
                      </TouchableOpacity>
                    )}
                  </View>
                }
              />
            </View>
          ) : (
            <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-row items-center">
              <AntDesign name="calendar" size={24} color="black" className="ml-2" />
              <Text className="ml-2 text-gray">{searchDate ? searchDate.toLocaleDateString('pt-BR') : "Buscar por data"}</Text>
              {searchDate && (
                <TouchableOpacity onPress={clearDate}>
                  <MaterialIcons name="clear" size={24} color="black" className="ml-2" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showDatePicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={searchDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(date)}
        />
      )}
    </View>
  );
}
