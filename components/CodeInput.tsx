import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";

interface CodeProps {
  pullCode: (arg: string[]) => void;
}

export default function CodeInput({ pullCode }: CodeProps) {
  const firstInput = useRef<null | TextInput>(null);
  const secondInput = useRef<null | TextInput>(null);
  const thirdInput = useRef<null | TextInput>(null);
  const fourthInput = useRef<null | TextInput>(null);

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleKeyPress = (
    inputNumber: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const key = event.nativeEvent.key;
    if (key === "Backspace") {
      const newOtp = [...otp];
      newOtp[inputNumber] = "";
      setOtp(newOtp);

      switch (inputNumber) {
        case 0:
          firstInput.current?.focus();
          break;
        case 1:
          firstInput.current?.focus();
          break;
        case 2:
          secondInput.current?.focus();
          break;
        case 3:
          thirdInput.current?.focus();
          break;
        default:
          break;
      }
    } else if (/\d/.test(key)) {
      const newOtp = [...otp];
      newOtp[inputNumber] = event.nativeEvent.key;
      setOtp(newOtp);

      switch (inputNumber) {
        case 0:
          secondInput.current?.focus();
          break;
        case 1:
          thirdInput.current?.focus();
          break;
        case 2:
          fourthInput.current?.focus();
          break;
        case 3:
          fourthInput.current?.blur();
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <View className="flex flex-row space-x-2">
        <Pressable onPress={() => firstInput.current?.focus()}>
          <View className="shadow shadow-zinc-700 rounded-md">
            <TextInput
              className="text-2xl text-center bg-zinc-50 rounded-md w-16 py-6"
              ref={firstInput}
              onKeyPress={(event) => handleKeyPress(0, event)}
              inputMode="numeric"
              value={otp[0]}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => secondInput.current?.focus()}>
          <View className="shadow shadow-zinc-700 rounded-md">
            <TextInput
              className="text-2xl text-center bg-zinc-50 rounded-md w-16 py-6"
              ref={secondInput}
              onKeyPress={(event) => handleKeyPress(1, event)}
              inputMode="numeric"
              value={otp[1]}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => thirdInput.current?.focus()}>
          <View className="shadow shadow-zinc-700 rounded-md">
            <TextInput
              className="text-2xl text-center bg-zinc-50 rounded-md w-16 py-6"
              ref={thirdInput}
              onKeyPress={(event) => handleKeyPress(2, event)}
              inputMode="numeric"
              value={otp[2]}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => fourthInput.current?.focus()}>
          <View className="shadow shadow-zinc-700 rounded-md">
            <TextInput
              className="text-2xl text-center bg-zinc-50 rounded-md w-16 py-6"
              ref={fourthInput}
              onKeyPress={(event) => handleKeyPress(3, event)}
              inputMode="numeric"
              value={otp[3]}
            />
          </View>
        </Pressable>
      </View>
      <TouchableOpacity
        onPress={() => pullCode(otp)}
        className="flex-row rounded-full p-3 mt-5 bg-teal-950 justify-center shadow-lg w-full"
      >
        <View className="w-full justify-center items-center">
          <Text className="text-white text-lg mt-1 justify-center items-center">
            Confirmar código
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
