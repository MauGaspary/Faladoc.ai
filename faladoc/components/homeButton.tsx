import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ConsultButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonContent}>
        <FontAwesome5 name="microphone" size={24} color="white" />
        <Text style={styles.buttonText}>Iniciar Consulta</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#069696',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
});

export default ConsultButton;
