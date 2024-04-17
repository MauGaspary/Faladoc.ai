import React, { useState, useEffect, useRef, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, Image } from "react-native";
import { StopPauseButton } from "../../components/StopPauseButton";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import audioContext from "../../provider/AudioContext";

export default function ConsultaAndamentoScreen({navigation}:any) {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [started, setStarted] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { setUri } = useContext(audioContext);

  useEffect(() => {
    // Passar essa parte de autorização para a tela anterior
    Audio.requestPermissionsAsync().then(({granted}:any) => {
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
        console.error(error);
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
      console.error(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível pausar a gravação do áudio"
      );
    }
  };

  const handleRecordingContinue = async () => {
    try {
      if (recording) {
        await recording.startAsync();
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível continuar a gravação do áudio"
      );
    }
  };

  const handleRecordingStop = async () => {
    // Adicionar depois um botão de confirmação para salvar o áudio
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        setUri(uri ? uri : "");
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        setStopped(true);
        navigation.navigate('Processando Consulta');
        console.log("Processando Consulta");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível salvar a gravação do áudio"
      );
    }
  };

  return (
    <View className="flex flex-col items-center justify-center h-full bg-[#D0EFF0]">
      <View className="w-[400px] h-[130px] object-contain mb-10">
        {started && (
          <Image
            source={require("../../assets/photoaudio.png")}
            className="max-w-[400px] max-h-[130px] object-contain mb-10"
          />
        )}
      </View>
      <View className="text-center">
        {recording || !stopped ? (
          started ? (
            <Text className="text-2xl font-semibold">Gravando</Text>
          ) : (
            <Text className="text-2xl font-semibold">Pausado</Text>
          )
        ) : (
          <Text className="text-2xl font-semibold">Áudio Finalizado</Text>
        )}
      </View>
      <View className="mb-20">
        <Text className="text-timer text-center font-bold text-4xl mt-4">
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </Text>
      </View>
      <View className="flex flex-row mt-10 items-center justify-center">
        <StopPauseButton onPress={handlePauseButton} type="pause" />
        <View className="mx-5" />
        <StopPauseButton onPress={handleRecordingStop} type="stop" />
      </View>
      <StatusBar style="auto" />
    </View>
    
  );
}
