import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Input = ({ iconName, placeholder }) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={24} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#069696',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    width: 300
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default Input;
