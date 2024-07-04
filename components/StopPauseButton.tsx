import { Dimensions, Pressable} from "react-native";
import { PauseIcon } from "../assets/icons/PauseIcon";
import { StopIcon } from "../assets/icons/StopIcon";
import { PlayIcon } from "../assets/icons/PlayIcon";
import { useState } from "react";
import AppText from "./AppText";

type StopPauseButtonProps = {
  type: "stop" | "pause";
  onPress: () => void;
}

const screenWidth = Dimensions.get('window').width;

// Calculate the width in pixels (assuming 1rem = 16px, adjust as needed)
const calculatedWidth = screenWidth * (8.75 * 16) / screenWidth; // Adjust this formula based on your design
const calculatedHeigth = screenWidth * (7.5 * 16) / screenWidth; // Adjust this formula based on your design
const calculatedRadius = screenWidth * (0.75 * 16) / screenWidth; // Adjust this formula based on your design



export function StopPauseButton({ type, onPress }: StopPauseButtonProps) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const handlePress = () => {
    if (type === 'pause') {
      setButtonPressed(!buttonPressed);
    }
    onPress();
  };
  return (
    <Pressable onPress={handlePress} style={{width: calculatedWidth, height: calculatedHeigth, borderRadius: calculatedRadius}} className={`flex flex-row items-center justify-center ${type === 'stop' ? 'bg-[#B42512]' : 'bg-[#12B418]'}`  }>
      {type === 'pause' ? (buttonPressed ? <PlayIcon /> : <PauseIcon />) : <StopIcon />}
    </Pressable>
  );
}