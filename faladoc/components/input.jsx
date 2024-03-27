import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Input = () => {
  const [pressed, setPressed] = useState(false)

  return (
    <View style={styles.inputContainer}>
      <Ionicons name= "key" size={24} color="Black" />
      <TextInput
        onFocus={()=> setPressed(true)}
        onBlur={()=> setPressed(false)}
        placeholder='leonardo'
        style={pressed ? styles.inputPressed : styles.input}
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
    paddingHorizontal:10,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 35,
    color: 'black',
    marginLeft: 15,
  },
  inputPressed:{
    flex: 1,
    height: 35,
    backgroundColor: 'blue',
    marginLeft: 15,
  }
});

export default Input;
