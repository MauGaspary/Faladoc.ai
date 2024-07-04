import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, Image,Keyboard, Pressable } from "react-native";
import { StopPauseButton } from "../../components/StopPauseButton";
import { CancelConsultationButton } from "../../components/CancelConsultationButton";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import SessionContext from "../../provider/sessionContext";
import AppText from "../../components/AppText";
import axios from "axios";
import MicPermissionModal from "../../components/MicPermissionModal";


export default function ConsultaAndamento({ navigation }: any) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMicPermissionModalVisible, setIsMicPermissionModalVisible] = useState(false);
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
      } else {
        handleMicPermissionError();
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
  const handleScreenPress = () => {
    Keyboard.dismiss();
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
        setIsConfirmModalVisible(false);
        navigation.navigate("ProcessingAppointment");
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
    setIsDiscardModalVisible(true);
  };

  const handleStopConsultation = () => {
    setIsConfirmModalVisible(true);
  };

  const handleDiscardRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }
      setIsDiscardModalVisible(false);
      navigation.navigate("StartNewAppointment");
    } catch (error) {
      Alert.alert(
        "Erro ao descartar gravação",
        "Não foi possível descartar a gravação do áudio"
      );
    }
  };

  const handleMicPermissionError = () => {
    setIsMicPermissionModalVisible(true);
  };

  const handleMicPermissionModalClose = () => {
    setIsMicPermissionModalVisible(false);
  };

  return (
    <Pressable className="h-full" onPress={handleScreenPress}>
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
          !stopped && (
            <AppText className="text-2xl font-semibold">Pausado</AppText>
          )
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
        <StopPauseButton onPress={handleStopConsultation} type="stop" />
      </View>
      <View>
        <CancelConsultationButton onPress={handleCancelConsultation} />
      </View>
      <StatusBar style="auto" />
      <ConfirmationModal
        isVisible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        onConfirm={handleRecordingStop}
        text="Voce deseja realmente finalizar a consulta?"
        cancelButtonText="Cancelar"
        submitButtonText="Enviar"
      />
      <ConfirmationModal
        isVisible={isDiscardModalVisible}
        onClose={() => setIsDiscardModalVisible(false)}
        onConfirm={handleDiscardRecording}
        text="Voce deseja realmente cancelar a consulta?"
        cancelButtonText="Cancelar"
        submitButtonText="Descartar"
      />
      <MicPermissionModal
        isVisible={isMicPermissionModalVisible}
        onClose={() => {
          handleMicPermissionModalClose();
        }}
        />
    </View>
    </Pressable>
  );
}