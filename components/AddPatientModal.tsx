import { useState, useEffect, useContext } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import MaskInput from "react-native-mask-input";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";
import SessionContext from "../provider/sessionContext";
import AppText from "./AppText";

export function AddPatientModal(this: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [birthDate, setbirthDate] = useState("");

  const [cpf, setCpf] = useState("");
  const [isCpfValid, setIsCpfValid] = useState(true);
  
  const {setPatientInfo} = useContext(SessionContext);

  const handleCpfChange = (masked: string, unmasked: string) => {
    setCpf(masked);
    setIsCpfValid(isValidCPF(unmasked)); 
  };

  function isValidCPF(document: string) {
    if (typeof document !== "string") return false;
    document = document.replace(/[\s.-]*/gim, "");
    if (
      !document ||
      document.length != 11 ||
      document == "00000000000" ||
      document == "11111111111" ||
      document == "22222222222" ||
      document == "33333333333" ||
      document == "44444444444" ||
      document == "55555555555" ||
      document == "66666666666" ||
      document == "77777777777" ||
      document == "88888888888" ||
      document == "99999999999"
    ) {
      return false;
    }
    let sum = 0;
    let remnant;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(document.substring(i - 1, i)) * (11 - i);
    remnant = (sum * 10) % 11;
    if (remnant == 10 || remnant == 11) remnant = 0;
    if (remnant != parseInt(document.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(document.substring(i - 1, i)) * (12 - i);
    remnant = (sum * 10) % 11;
    if (remnant == 10 || remnant == 11) remnant = 0;
    if (remnant != parseInt(document.substring(10, 11))) return false;
    return true;
  }

  const handleSubmit = async () => {
    if (!name || !birthDate|| !cpf) {
      return;
    }

    setSuccessModalVisible(true);

    let patient = {
      name: name,
      date_of_birth: birthDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'),
      cpf: cpf.replace(/[\s.-]*/gim, ""),
    };

    try {
      // const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/patients`, patient);
      const response = await axios.post(`http://3.22.75.73:3000/patients`, patient);
      if (response.status !== 201) {
        throw new Error("Failed to create patient");
      }
      setCpf("");
      setName("");
      setbirthDate("");
      setPatientInfo(response.data);
      setSuccessModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (successModalVisible) {
      setTimeout(() => {
        setSuccessModalVisible(false);
      }, 2500);
    }
  }, [successModalVisible]);

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex self-center border-[1px] rounded-[15px] border-[#069696] my-auto bg-white w-[80%] p-5 pt-10">
          <View className="gap-5">
            <View>
              <View className="border-2 rounded-full py-2 px-4 flex-row items-center border-[#069696]">
                <AntDesign name="user" size={24} color="black" className="mr-2" />
                <TextInput
                  className="flex-grow ml-2"
                  placeholder="Nome"
                  placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View>
              <View className={`border-2 rounded-full py-2 px-4 flex-row items-center border-lightGreen`}>
                <AntDesign name="calendar" size={24} color="black" className="mr-2" />
                <MaskInput
                  className="flex-grow ml-2"
                  placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                  maxLength={10}
                  placeholder="Data de Nascimento"
                  inputMode="numeric"
                  value={birthDate}
                  onChangeText={(masked: string, unmasked: string) => setbirthDate(masked)}
                  mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                />
              </View>
            </View>

            <View
              className={`border-2 rounded-full py-2 px-4 flex-row items-center ${isCpfValid ? "border-lightGreen" : "border-invalid"}`}
            >
              <AntDesign name="idcard" size={24} color="black" className="mr-2" />
              <MaskInput
                className="flex-grow ml-2"
                placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                maxLength={14}
                placeholder="CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={handleCpfChange}
                mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
              />
            </View>
              {!isCpfValid && <AppText className="text-red-500 text-xs pl-4">CPF inválido</AppText>}

            <View className="items-center">
              <Pressable
                onPress={() => {
                  handleSubmit();
                  setModalVisible(false);
                }}
                disabled={cpf.length !== 14 || birthDate.length !== 10 || !name}
                className={`bg-[#12ADB4] w-[80%] items-center p-2 rounded ${
                  cpf.length !== 14 || birthDate.length !== 10 || !name ? "opacity-50" : ""
                }`}
              >
                <FontAwesome name="check" size={24} color="white" />
              </Pressable>
            </View>

            <View className="items-center">
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                className="bg-invalid w-[50%] items-center p-2 rounded"
              >
                <FontAwesome name="close" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <View className="flex self-center border-[1px] rounded-[15px] border-lightGreen my-auto bg-white w-[80%] p-5">
          <View className="items-center gap-7">
            <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
              <FontAwesome5 name="check-circle" size={60} color="white" />
            </View>
            <AppText className="text-lg text-center font-bold opacity-30">Cadastro realizado com sucesso!</AppText>
          </View>
        </View>
      </Modal>

      <Pressable
        className="bg-[#12ADC4] w-[282px] rounded-[15px] flex flex-row p-3 justify-around"
        onPress={() => setModalVisible(true)}
      >
        <AppText className="text-white font-bold flex items-center">Cadastrar Novo Paciente</AppText>
        <FontAwesome name="plus" size={24} color="white" />
      </Pressable>
    </>
  );
}
