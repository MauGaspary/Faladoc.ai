import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NewPatient = () => {
  return (
    <TouchableOpacity style={styles.botao}>
      <Text style={styles.textoBotao}>
        Cadastrar novo paciente <Text style={styles.icone}>+</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#069696',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
  },
  icone: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default NewPatient;
