import { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import MaskInput from "react-native-mask-input";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";

export function AddPatientModal(this: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [cpf, setCpf] = useState("");
  const [isCpfValid, setIsCpfValid] = useState(true);

  const handleCpfChange = (masked: string, unmasked: string) => {
    setCpf(masked);
    setIsCpfValid(isValidCPF(unmasked)); 
  };

  function isValidCPF(documento: string) {
    if (typeof documento !== "string") return false;
    documento = documento.replace(/[\s.-]*/gim, "");
    if (
      !documento ||
      documento.length != 11 ||
      documento == "00000000000" ||
      documento == "11111111111" ||
      documento == "22222222222" ||
      documento == "33333333333" ||
      documento == "44444444444" ||
      documento == "55555555555" ||
      documento == "66666666666" ||
      documento == "77777777777" ||
      documento == "88888888888" ||
      documento == "99999999999"
    ) {
      return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(documento.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(documento.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(documento.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(documento.substring(10, 11))) return false;
    return true;
  }

  const handleSubmit = async () => {
    if (!nome || !dataNascimento || !cpf) {
      return;
    }

    setSuccessModalVisible(true);

    let patient = {
      nome,
      dataNascimento: dataNascimento,
      cpf: cpf,
    };

    try {
      const response = await axios.post(`${process.env.urlbase}/patients`, patient);
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
              <View className="border rounded-full py-2 px-4 flex-row items-center border-[#069696]">
                <AntDesign name="user" size={24} color="black" className="mr-2" />
                <TextInput
                  className="flex-grow"
                  placeholder="Nome"
                  placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>
            </View>

            <View>
              <View className={`border rounded-full py-2 px-4 flex-row items-center`}>
                <AntDesign name="user" size={24} color="black" className="mr-2" />
                <MaskInput
                  className="flex-grow"
                  placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                  maxLength={10}
                  placeholder="Data de Nascimento"
                  keyboardType="numeric"
                  value={dataNascimento}
                  onChangeText={(masked: string, unmasked: string) => setDataNascimento(masked)}
                  mask={[/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                />
              </View>
            </View>

            <View
              className={`border rounded-full py-2 px-4 flex-row items-center ${isCpfValid ? "" : "border-invalid"}`}
            >
              <AntDesign name="user" size={24} color="black" className="mr-2" />
              <MaskInput
                className="flex-grow"
                placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                maxLength={14}
                placeholder="CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={handleCpfChange}
                mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
              />
            </View>
              {!isCpfValid && <Text className="text-red-500 text-xs pl-4">CPF inválido</Text>}

            <View className="items-center">
              <Pressable
                onPress={() => {
                  handleSubmit();
                  setModalVisible(false);
                }}
                disabled={cpf.length !== 14 || dataNascimento.length !== 10 || !nome}
                className={`bg-[#12ADB4] w-[80%] items-center p-2 rounded ${
                  cpf.length !== 14 || dataNascimento.length !== 10 || !nome ? "opacity-50" : ""
                }`}
              >
                <FontAwesome name="check" size={24} color="white" />
              </Pressable>
            </View>

            <View className="items-center">
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                className="bg-[#F17777] w-[50%] items-center p-2 rounded"
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
        <View className="flex self-center border-[1px] rounded-[15px] border-[#069696] my-auto bg-white w-[80%] p-5">
          <View className="items-center gap-7">
            <View className="bg-[#00E733] rounded-full w-[70px] h-[70px] justify-center items-center">
              <FontAwesome5 name="check-circle" size={60} color="white" />
            </View>
            <Text className="text-lg text-center font-bold opacity-30">Cadastro realizado com sucesso!</Text>
          </View>
        </View>
      </Modal>

      <Pressable
        className="bg-[#12ADB4] w-[282px] rounded-[15px] flex flex-row p-3 justify-around"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-bold">Cadastrar Novo Paciente</Text>
        <FontAwesome name="plus" size={24} color="white" />
      </Pressable>
    </>
  );
}
