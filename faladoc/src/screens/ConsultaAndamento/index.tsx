import React, { useState, useEffect, useRef, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, Share, Button } from "react-native";
import styles from "./style";
import { StopPauseButton } from "../../../components/StopPauseButton";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import audioContext from "../../../provider/AudioContext";

export default function ConsultaAndamento() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [started, setStarted] = useState(true);
  const [stopped, setStopped] = useState(false); 
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingFileUri, setRecordingFileUri] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); 
  const {uriPath, setUri} = useContext(audioContext);

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
        startTimer();
        handleRecordingStart();
      }
    });


    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);
  };

  const handlePauseButton = () => {
    if (!stopped) {
      if (started) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        setStarted(false);
        handleRecordingPause();
      } else {
        startTimer();
        setStarted(true);
        handleRecordingContinue();
      }
    }
  };

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

  const handleRecordingPause = async () => {
    try {
      if (recording) {
        await recording.pauseAsync();
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
        setUri(uri ? uri : "");
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        setStopped(true); 
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível parar a gravação do áudio"
      );
    }
  };

  console.log("Contexto: " + uriPath);

  return (
    <View style={styles.container}>
      <Text style={styles.textTimer}>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <StopPauseButton onPress={handlePauseButton} type="pause" />
        <StopPauseButton onPress={handleRecordingStop} type="stop" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}