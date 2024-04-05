import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, Image } from 'react-native';
import styles from './style';

export default function ConsultaAndamento() {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState<NodeJS.Timeout>();

  const startTimer = () => {
    const intervalId = setInterval(() => {
      changeTime();
    }, 1000);
    setCustomInterval(intervalId);
  };

  const stopTimer = () => {
    if(customInterval) {
      clearInterval(customInterval);
    }
  };

  const clear = () => {
    stopTimer();
    setSeconds(0);
    setMinutes(0);
  }

  const changeTime = () => {
    setSeconds((prevState) => {
      if(prevState + 1 === 60){
        setMinutes(prevMinutes => prevMinutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTimer}>
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title='Começar' onPress={startTimer}/>
        <Button title='Parar' onPress={stopTimer}/>
        <Button title='Limpar' onPress={clear}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}