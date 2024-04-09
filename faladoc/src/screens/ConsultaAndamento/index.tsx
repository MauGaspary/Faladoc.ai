import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, Share, Button } from "react-native";
import styles from "./style";
import { StopPauseButton } from "../../../components/StopPauseButton";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";

export default function ConsultaAndamento() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [started, setStarted] = useState(false);
  const [customInterval, setCustomInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [pausedSeconds, setPausedSeconds] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingFileUri, setRecordingFileUri] = useState<string | null>(null);

  useEffect(() => {
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (granted) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        });
      }
    });
  }, []);

  const handleRecordingStart = async () => {
    const { granted } = await Audio.getPermissionsAsync();

    if (granted) {
      try {
        const recordingObject = new Audio.Recording();
        await recordingObject.prepareToRecordAsync();
        await recordingObject.startAsync();
        setRecording(recordingObject);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Erro ao gravar",
          "Não foi possível iniciar a gravação do áudio"
        );
      }
    }
  };

  const handleAudioPlay = async () => {
    if (recordingFileUri) {
      try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync({ uri: recordingFileUri });
        await soundObject.setVolumeAsync(1.0);
        await soundObject.playAsync();
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Erro ao reproduzir",
          "Não foi possível reproduzir o áudio"
        );
      }
    }
  };

  const handleShareAudio = async () => {
    if (recordingFileUri) {
      try {
        await Share.share({
          url: recordingFileUri,
          title: "Compartilhar áudio",
        });
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Erro ao compartilhar",
          "Não foi possível compartilhar o áudio"
        );
      }
    }
  };

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

  const changeTime = () => {
    setSeconds((prevState) => {
      if (prevState + 1 === 60) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };

  const handlePauseButton = () => {
    if (started) {
      stopTimer();
      handleRecordingPause();
    } else {
      const intervalId = startTimer();
      setCustomInterval(intervalId);
      setStarted(true);
      handleRecordingContinue();
    }
  };

  const handleRecordingPause = async () => {
    try {
      if (recording) {
        await recording.pauseAsync();
        setRecording(recording);
        stopTimer();
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível parar a gravação do áudio"
      );
    }
  };

  const handleRecordingContinue = async () => {
    try {
      if (recording) {
        await recording.startAsync();
        setRecording(recording);
        startTimer();
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível parar a gravação do áudio"
      );
    }
  };

  const handleRecordingStop = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log(uri);
        setRecordingFileUri(uri);
        setRecording(null);
        stopTimer();
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível parar a gravação do áudio"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTimer}>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </Text>
      <View>
        <Button title="Começar" onPress={handleRecordingStart} />

        <StopPauseButton onPress={handlePauseButton} type="pause" />
        <StopPauseButton onPress={handleRecordingStop} type="stop" />
        {recordingFileUri !== null && (
          <Button title="Ouvir áudio" onPress={handleAudioPlay} />
        )}
        {recordingFileUri !== null && (
          <Button title="Compartilhar áudio" onPress={handleShareAudio} />
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
