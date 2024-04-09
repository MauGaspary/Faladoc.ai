import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import styles from './style';

export default function ConsultaAndamento() {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [started, setStarted] = useState(false);
  const [customInterval, setCustomInterval] = useState<NodeJS.Timeout | null>(null);
  const [pausedSeconds, setPausedSeconds] = useState(0); 

  useEffect(() => {
    if (!started) {
      const intervalId = startTimer();
      setCustomInterval(intervalId);
      setStarted(true);
    }
  }, []);

  const startTimer = () => {
    const intervalId = setInterval(() => {
      changeTime();
    }, 1000);
    return intervalId;
  };

  const stopTimer = () => {
    if (customInterval) {
      clearInterval(customInterval);
      setCustomInterval(null);
      setStarted(false);
      setPausedSeconds(seconds); 
    }
  };

  const clear = () => {
    stopTimer();
    setSeconds(0);
    setMinutes(0);
  };

  const changeTime = () => {
    setSeconds((prevState) => {
      if(prevState + 1 === 60){
        setMinutes(prevMinutes => prevMinutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };

  const handleStartButton = () => {
    if (!started) {
      const intervalId = startTimer();
      setCustomInterval(intervalId);
      setStarted(true);
    } else {
      setSeconds(pausedSeconds % 60);
      setMinutes(Math.floor(pausedSeconds / 60));
      startTimer();
      setStarted(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTimer}>
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title='Começar' onPress={handleStartButton} disabled={started}/>
        <Button title='Parar' onPress={stopTimer}/>
        <Button title='Limpar' onPress={clear}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
