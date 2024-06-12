import { View, Text, ActivityIndicator, Dimensions, Modal, Pressable, TouchableOpacity } from "react-native";
import HomeButton from "../../components/Homebutton";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SessionContext from "../../provider/sessionContext";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ProcessandoConsultaScreen({ navigation }: any) {
  const { appoitmentInfos, patientInfo, setAppoitmentInfos, setPatientInfo } = useContext(SessionContext);
  const [formattedTime, setFormattedTime] = useState("");
  const [status, setStatus] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    setStatus("success");
    updateAppointment();
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setModalVisibility(false);
        navigation.navigate("Iniciar nova Consulta");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, navigation]);

  const handleModalPress = () => {
    setModalVisibility(false);
    navigation.navigate("Iniciar nova Consulta"); // replace 'Home' with the name of your Home screen
  };

  const updateAppointment = async () => {
    try {
      const body = {
        medical_record_original:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos inventore porro tenetur iusto, quae tempora numquam corrupti dolor voluptas soluta commodi neque aperiam earum accusantium ipsa? Et, quae esse Reprehenderit corporis corrupti ullam, aut fuga nulla deleniti ducimus modi error quam possimus sunt explicabo nobis consectetur veritatis vitae id sequi in aspernatur commodi aperiam qui inventore maiores. Distinctio, ex",
      };
      // const res = await axios.patch(`http://localhost:3000/appointments/${appointment_id}`, body)
      const res = await axios.patch(`http://localhost:3000/appointments/${appoitmentInfos.id}`, body);
      const seconds = appoitmentInfos.duration;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      
      if (res.status === 200) {
        setStatus("success");
        setModalVisibility(true);
      } else {
        setStatus("error");
        setModalVisibility(true);
      }

      setFormattedTime(`${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`);
      return res.data;
    } catch (error) {
      setStatus("error");
      setModalVisibility(true);
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

      <ActivityIndicator size={70} color={"grey"} className="mt-10 mb-10" />

      <HomeButton name="Voltar para a tela inicial" onPress={handleHomeButton} />

      {status === "success" ? (
        <Pressable onPress={handleModalPress}>
        <Modal animationType="none" transparent={true} visible={modalVisibility}>
            <View className="flex self-center border-[1px] rounded-[15px] border-lightGreen my-auto bg-white w-[80%] p-5">
              <View className="items-center gap-7">
                <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
                  <FontAwesome5 name="check-circle" size={60} color="white" />
                </View>
                <Text className="text-lg text-center font-bold opacity-30">Prontuario processado com sucesso!</Text>
              </View>
            </View>
        </Modal>
          </Pressable>
      ) : status === "error" ? (
          <Pressable onPress={handleModalPress}>
        <Modal animationType="none" transparent={true} visible={modalVisibility}>
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
          </Pressable>
      ) : null}
    </View>
  );
}
