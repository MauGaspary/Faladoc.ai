import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, Image } from "react-native";
import { StopPauseButton } from "../../components/StopPauseButton";
import { CancelConsultationButton } from "../../components/CancelConsultationButton";
import CancelConsultationModal from "../../components/CancelConsultationModal";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import SessionContext from "../../provider/sessionContext";
import AppText from "../../components/AppText";


export default function ConsultaAndamento({navigation}:any) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setUri, patientInfo, appoitmentInfos, setAppoitmentInfos } = useContext(SessionContext);

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
        handleRecordingStart();
      }
    });
  }, []);

  useEffect(() => {
    if (recording) {
      const timer = setInterval(() => {
        recording
          .getStatusAsync()
          .then(function (result) {
            if (result.isRecording) {
              const totalSeconds = Math.floor(result.durationMillis / 1000);
              const newMinutes = Math.floor(totalSeconds / 60);
              const newSeconds = totalSeconds % 60;
              setMinutes(newMinutes);
              setSeconds(newSeconds);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [recording]);

  const handlePauseButton = () => {
    if (!stopped) {
      if (started) {
        handleRecordingPause();
      } else {
        handleRecordingContinue();
      }
      setStarted(!started);
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
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        setUri(uri ? uri : "");
        setStopped(true);
        setAppoitmentInfos({
          ...appoitmentInfos,
          duration: minutes * 60 + seconds,
        });
        navigation.navigate('ProcessingAppointment');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao gravar",
        "Não foi possível salvar a gravação do áudio"
      );
    }
  };

  const handleCancelConsultation = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDiscardRecording = async () => {
    try{
      if (recording){
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }
      setIsModalVisible(false);
      navigation.navigate("StartNewAppointment");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao descartar gravação",
        "Não foi possível descartar a gravação do áudio"
      );
    }
  };

  return (
    <View className="flex flex-col items-center justify-center h-full bg-background">

      <View className="w-[400px] h-[130px] object-contain mb-10">
        {started && (
          <Image
            source={require("../../assets/photoaudio.png")}
            className="w-full h-full object-contain"
          />
        )}
      </View>
      <View className="text-center">
        {recording && started ? (
          <AppText className="text-2xl font-semibold">Gravando</AppText>
        ) : (
          !stopped && <AppText className="text-2xl font-semibold">Pausado</AppText>
        )}
      </View>
      <View className="mb-20">
        {(recording || !stopped) && (
          <AppText className="text-timer text-center font-bold text-4xl mt-4">
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </AppText>
        )}
      </View>
      <View className="flex flex-row mt-10 items-center justify-center">
        <StopPauseButton onPress={handlePauseButton} type="pause" />
        <View className="mx-5" />
        <StopPauseButton onPress={handleRecordingStop} type="stop" />
      </View>
      <View>
        <CancelConsultationButton onPress={handleCancelConsultation}/>
      </View>
      <StatusBar style="auto" />
      <CancelConsultationModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onConfirm={handleDiscardRecording}
      />
    </View>
  );
}
