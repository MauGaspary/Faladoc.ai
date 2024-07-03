import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import HomeButton from "../../components/Homebutton";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SessionContext from "../../provider/sessionContext";
import AppText from "../../components/AppText";
import { FontAwesome5 } from "@expo/vector-icons";
import Audio from "../../public/audio/test-02.wav";


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
  const [status, setStatus] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    sendAppointmentInfoAndUpdateAppointment();
  }, []);

  async function sendAppointmentInfoAndUpdateAppointment() {
    const url = "https://0njnx.apps.beam.cloud/api/v1/prontuarios";
    const filetype = uriPath.split(".").pop();
    const fileName = uriPath.split("/").pop();

    try {
      const response = await fetch("https://gabrielbohn99.github.io/whitelabel/test-02.wav");//Consertar
      // const response = await fetch(getAudioFileUri(uriPath));
      const blob = await response.blob();
      const formData = new FormData();

      formData.append("audio_file", blob, `${fileName}.${filetype}`);

      const seconds = appoitmentInfos.duration;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      setFormattedTime(
        `${minutes.toString().padStart(2, "0")}:${remainingSeconds
          .toString()
          .padStart(2, "0")}`
      );

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

          setStatus("success");
          setModalVisibility(true);

          setTimeout(() => {
            setModalVisibility(false);
          }, 5000);

          setWaitingResponse(false);
          return res.data;
        } catch (error) {
          setWaitingResponse(false);
          setStatus("error");
          setModalVisibility(true);
          setTimeout(() => {
            setModalVisibility(false);
          }, 5000);
          console.log(error);
        }
      } catch (error) {
        console.error("Upload1 failed:", error);
        setStatus("error");
        setWaitingResponse(false);
      }
    } catch (error) {
      console.error("Upload2 failed:", error);
      setStatus("error");
      setWaitingResponse(false);
    }
  }

  const handleHomeButton = () => {
    setAppoitmentInfos({
      id: "",
      duration: 0,
      hospital: "",
      context: "",
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
        Hospital: {appoitmentInfos.hospital ? appoitmentInfos.hospital : "Não informado"}
        {"\n"}
        Context: {appoitmentInfos.context ? appoitmentInfos.context : "Não informado"}
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
          <AppText className="mt-10 text-black  text-left text-lg">
            Processamento finalizado
          </AppText>
        )}
      </View>

      <HomeButton
        disabled={waitingResponse}
        name="Voltar para a tela inicial"
        onPress={handleHomeButton}
      />

      {status === "success" ? (
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisibility}
        >
          <View className="flex self-center border-[1px] rounded-[15px] border-lightGreen my-auto bg-white w-[80%] p-5">
            <View className="items-center gap-7">
              <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
                <FontAwesome5 name="check-circle" size={60} color="white" />
              </View>
              <Text className="text-lg text-center font-bold opacity-30">
                Prontuario processado com sucesso!
              </Text>
            </View>
          </View>
        </Modal>
      ) : status === "error" ? (
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisibility}
        >
          <View className="flex self-center border-[1px] rounded-[15px] border-lightRed my-auto bg-white w-[80%] p-5">
            <View className="items-center gap-7">
              <View className="bg-[#FF0000] rounded-full w-[70px] h-[70px] justify-center items-center">
                <FontAwesome5 name="times-circle" size={60} color="white" />
              </View>
              <Text className="text-lg text-center font-bold opacity-30">
                Ocorreu um erro ao processar o prontuario!
              </Text>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}
