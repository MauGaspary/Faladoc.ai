// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, Platform, Dimensions } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AppText from "./AppText";

type FiltersComponentType = {
  onFilter: (searchTerm: string, searchDate: Date | null) => void;
  enableNameFilter?: boolean; 
  enableDateFilter?: boolean; 
};

const screenWidth = Dimensions.get('window').width;

// Calculate the width in pixels (assuming 1rem = 16px, adjust as needed)
const calculatedRadius = screenWidth * (1.875 * 16) / screenWidth; // Adjust this formula based on your design

export function FiltersComponent({ onFilter, enableNameFilter = true, enableDateFilter = true }: FiltersComponentType) {
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
    <View style={{borderRadius: calculatedRadius}} className="border py-3 px-4 mb-3 w-11/12 flex-col items-center bg-white z-10">
      <View className="flex flex-row items-center w-full">
        {enableNameFilter && (
          <View className={`flex-row items-center w-2/4 ${enableDateFilter ? 'border-r ' : ''}`}>
            <AntDesign name="search1" size={24} color="black" className="mr-2" />
            <TextInput
              className="flex ml-2 text-gray w-3/4"
              placeholder="Buscar por nome"
              placeholderTextColor="gray"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        )}
        {enableDateFilter && (
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
                        <Pressable onPress={clearDate}>
                          <MaterialIcons name="clear" size={24} color="black" className="ml-2" />
                        </Pressable>
                      )}
                    </View>
                  }
                />
              </View>
            ) : (
              <Pressable onPress={() => setShowDatePicker(true)} className="flex-row items-center">
                <AntDesign name="calendar" size={24} color="black" className="ml-2" />
                <AppText className="ml-2 text-gray">{searchDate ? searchDate.toLocaleDateString('pt-BR') : "Buscar por data"}</AppText>
                {searchDate && (
                  <Pressable onPress={clearDate}>
                    <MaterialIcons name="clear" size={24} color="black" className="ml-2" />
                  </Pressable>
                )}
              </Pressable>
            )}
          </View>
        )}
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
