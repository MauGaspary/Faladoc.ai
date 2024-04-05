import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Input = ({iconName,placeholder}) => {

  return (
    <View style={styles.inputContainer}>
      <Ionicons name= {iconName} size={24} color="black" style={styles.icon}/>
      <TextInput
      style={styles.input}
        placeholder= {placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#6495ED',
    borderRadius: 50,
    paddingVertical:3,
    margin: 10,
    
  },
  input: {
    borderRadius: 50,
    paddingVertical:5,
    margin:10,
    left:10,
    width:350,
    fontSize:17,
  },
  icon: {
    marginTop: 13,
    left:12,
  }
});

export default Input;
