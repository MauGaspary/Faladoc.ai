import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import HomeButton from "../../components/Homebutton";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SessionContext from "../../provider/sessionContext";
import AppText from "../../components/AppText";

const getAudioFileUri = (uri: string) => {
  return Platform.OS === "android" ? uri : uri.replace("file://", "");
};

export default function ProcessingAppointmentScreen({ navigation }: any) {
  const {
    appoitmentInfos,
    patientInfo,
    setAppoitmentInfos,
    setPatientInfo,
    uriPath,
  } = useContext(SessionContext);
  const [formattedTime, setFormattedTime] = useState("");
  const [waitingResponse, setWaitingResponse] = useState(true);

  useEffect(() => {
    sendAppointmentInfoAndUpdateAppointment();
  }, []);

  async function sendAppointmentInfoAndUpdateAppointment() {
    const url = "https://0njnx.apps.beam.cloud/api/v1/prontuarios";
    const filetype = uriPath.split(".").pop();
    const fileName = uriPath.split("/").pop();

    const response = await fetch("/audio/test-02.wav");
    // const response = await fetch(getAudioFileUri(uriPath));
    const blob = await response.blob();
    const formData = new FormData();

    formData.append("audio_file", blob, `${fileName}.${filetype}`);

    try {
      setWaitingResponse(true);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      try {
        const body = {
          medical_record_original: response.data,
        };
        const res = await axios.patch(
          `http://3.22.75.73:3000/appointments/${appoitmentInfos.id}`,
          body
        );
        const seconds = appoitmentInfos.duration;
        // const seconds = 300;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        setFormattedTime(
          `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`
        );

        setWaitingResponse(false);
        return res.data;
      } catch (error) {
        setWaitingResponse(false);
        console.log(error);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  const { width, height } = Dimensions.get("window");

  const handleHomeButton = () => {
    setAppoitmentInfos({
      id: "",
      duration: 0,
      hospital: "",
      contexto: "",
    });
    setPatientInfo({
      id: "",
      name: "",
      date_of_birth: "",
      cpf: "",
    });
    navigation.navigate("StartNewAppointment");
  };

  return (
    <View className="flex flex-col h-screen justify-around items-center bg-background">
      <AppText className="mt-10 text-black text-left text-lg">
        {"\n\n"}
        Paciente: {patientInfo.name}
        {"\n"}
        Hospital: {appoitmentInfos.hospital}
        {"\n"}
        Contexto: {appoitmentInfos.contexto}
        {"\n"}
        Duração: {formattedTime}
      </AppText>

      <View className="flex flex-col gap-3">
        {waitingResponse ? (
          <>
            <ActivityIndicator
              size={70}
              color={"grey"}
              className="mt-10 mb-10"
            />
            <AppText className="mt-10 text-black  text-left text-lg">
              Consulta em processamento, aguarde...
            </AppText>
          </>
        ) : (
          <AppText className="mt-10 text-black  text-left text-lg">Processamento finalizado</AppText>
        )}
      </View>

      <HomeButton
        disabled={waitingResponse}
        name="Voltar para a tela inicial"
        onPress={handleHomeButton}
      />
    </View>
  );
}
