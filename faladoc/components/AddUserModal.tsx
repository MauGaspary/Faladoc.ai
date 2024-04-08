import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import MaskInput from "react-native-mask-input";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export function AddUserModal(this: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex self-center border-[3px] rounded border-slate-300 my-auto bg-white w-[80%] p-4">
          <View className="gap-5">
            <View className="flex self-end">
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>

            <TextInput className="border rounded p-2" placeholder="Nome" value={nome} onChangeText={setNome} />

            <MaskInput
              className="border rounded p-2"
              keyboardType="numeric"
              value={dataNascimento}
              onChangeText={(masked: string, unmasked: string) => setDataNascimento(masked)}
              mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            />

            <MaskInput
              className="border rounded p-2"
              keyboardType="numeric"
              value={cpf}
              onChangeText={(masked: string, unmasked: string) => setCpf(masked)}
              mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
            />
            <View className="items-center">
              <Pressable className="bg-green-600 w-[80%] items-center p-2 rounded">
                <FontAwesome name="check" size={24} color="white" />
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
