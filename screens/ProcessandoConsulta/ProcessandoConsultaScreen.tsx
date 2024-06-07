import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import HomeButton from "../../components/Homebutton";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SessionContext from "../../provider/sessionContext";

import Config from 'react-native-config';

const BASE_URL = Config.API_URL;

export default function ProcessandoConsultaScreen({ navigation }: any) {
  const { appoitmentInfos, patientInfo, setAppoitmentInfos, setPatientInfo } =
    useContext(SessionContext);
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    updateAppointment();
  }, []);

  const updateAppointment = async () => {
    try {
      const body = {
        medical_record_original:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos inventore porro tenetur iusto, quae tempora numquam corrupti dolor voluptas soluta commodi neque aperiam earum accusantium ipsa? Et, quae esse Reprehenderit corporis corrupti ullam, aut fuga nulla deleniti ducimus modi error quam possimus sunt explicabo nobis consectetur veritatis vitae id sequi in aspernatur commodi aperiam qui inventore maiores. Distinctio, ex",
      };
      // const res = await axios.patch(`${BASE_URL}/appointments/${appointment_id}`, body)
      const res = await axios.patch(
        `${BASE_URL}/appointments/${appoitmentInfos.id}`,
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
    navigation.navigate("Iniciar nova Consulta");
  };

  return (


    <View className="flex flex-col h-screen items-center bg-background">


      <Text className="mt-10 text-black text-left text-lg py-screen">
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
      </Text>

      <ActivityIndicator size={70} color={"grey"}  className="mt-10 mb-10"/>
      
      <HomeButton
        name="Voltar para a tela inicial"
        onPress={handleHomeButton}
      />

    </View>
  );
}
