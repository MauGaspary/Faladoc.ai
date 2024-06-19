import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import HomeButton from "../../components/Homebutton";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SessionContext from "../../provider/sessionContext";
import AppText from "../../components/AppText";

export default function ProcessingAppointmentScreen({ navigation }: any) {
  const { appoitmentInfos, patientInfo, setAppoitmentInfos, setPatientInfo } =
    useContext(SessionContext);
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    updateAppointment();
  }, []);

  async function sendAppointmentInfo() {
    // We need to make sure the audio file is in the correct format accepted by the API
    // In this case, we are sending a .wav file, but we need to enforce a file for both IOS and Android
    const url = "/";
    const audioFile = new File([""], "audio.wav", {
      type: "audio/wav",
    });
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      return response;
    } catch (error) {
      console.error("Error sending POST request:", error);
      throw error;
    }
  }

  const updateAppointment = async () => {
    try {
      const body = {
        medical_record_original:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos inventore porro tenetur iusto, quae tempora numquam corrupti dolor voluptas soluta commodi neque aperiam earum accusantium ipsa? Et, quae esse Reprehenderit corporis corrupti ullam, aut fuga nulla deleniti ducimus modi error quam possimus sunt explicabo nobis consectetur veritatis vitae id sequi in aspernatur commodi aperiam qui inventore maiores. Distinctio, ex",
      };
      // const res = await axios.patch(`http://3.22.75.73:3000/appointments/${appointment_id}`, body)
      const res = await axios.patch(
        `http://3.22.75.73:3000/appointments/${appoitmentInfos.id}`,
        body
      );
      const seconds = appoitmentInfos.duration;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      setFormattedTime(
        `${minutes.toString().padStart(2, "0")}:${remainingSeconds
          .toString()
          .padStart(2, "0")}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

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
      <AppText className="mt-10 text-black text-left text-lg py-screen">
        {"\n\n"}
        Paciente: {patientInfo.name}
        {"\n"}
        Hospital: {appoitmentInfos.hospital}
        {"\n"}
        Contexto: {appoitmentInfos.contexto}
        {"\n"}
        Duração: {formattedTime}
        {"\n\n "}
        Processando
      </AppText>

      <ActivityIndicator size={70} color={"grey"} className="mt-10 mb-10" />

      <HomeButton
        name="Voltar para a tela inicial"
        onPress={handleHomeButton}
      />
    </View>
  );
}
