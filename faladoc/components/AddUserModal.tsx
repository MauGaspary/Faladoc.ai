import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import MaskInput from "react-native-mask-input";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export function AddUserModal(this: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const [nome, setNome] = useState("");
  const [nomeEmpty, setNomeEmpty] = useState(false);

  const [dataNascimento, setDataNascimento] = useState("");
  const [dataNascimentoEmpty, setDataNascimentoEmpty] = useState(false);

  const [cpf, setCpf] = useState("");
  const [cpfEmpty, setCpfEmpty] = useState(false);

  const handleSubmit = () => {
    setNomeEmpty(nome === "");
    setDataNascimentoEmpty(dataNascimento === "");
    setCpfEmpty(cpf === "");
    // ...resto do código de submissão
  };

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
              <View
                className={`border rounded-full py-2 px-4 flex-row items-center ${
                  nomeEmpty ? "border-[#F17777]" : "border-[#069696]"
                }`}
              >
                <AntDesign name="user" size={24} color="black" className="mr-2" />
                <TextInput
                  className="flex-grow"
                  placeholder="Nome"
                  placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>
              <Text className="text-[#F17777] text-[12px] ml-2">*Preencha o campo nome</Text>
            </View>

            <View>
              <View
                className={`border rounded-full py-2 px-4 flex-row items-center ${
                  dataNascimentoEmpty ? "border-[#F17777]" : "border-[#069696]"
                }`}
              >
                <AntDesign name="user" size={24} color="black" className="mr-2" />
                <MaskInput
                  className="flex-grow"
                  placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                  maxLength={10}
                  placeholder="Data de Nascimento"
                  keyboardType="numeric"
                  value={dataNascimento}
                  onChangeText={(masked: string, unmasked: string) => setDataNascimento(masked)}
                  mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                />
              </View>
              <Text className="text-[#F17777] text-[12px] ml-2">
                *Preencha o campo data de nascimento data de nascimento inválida
              </Text>
            </View>

            <View
              className={`border rounded-full py-2 px-4 flex-row items-center ${
                cpfEmpty ? "border-[#F17777]" : "border-[#069696]"
              }`}
            >
              <AntDesign name="user" size={24} color="black" className="mr-2" />
              <MaskInput
                className="flex-grow"
                placeholderTextColor={`rgba(${0}, ${0}, ${0}, ${0.3})`}
                maxLength={14}
                placeholder="CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={(masked: string, unmasked: string) => setCpf(masked)}
                mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
              />
            </View>
            <View className="items-center">
              <Pressable onPress={handleSubmit} className="bg-[#12ADB4] w-[80%] items-center p-2 rounded">
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
      <Pressable className="bg-slate-600 rounded text-white" onPress={() => setModalVisible(true)}>
        <Text>Add User</Text>
      </Pressable>
    </>
  );
}
