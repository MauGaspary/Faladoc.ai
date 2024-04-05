import { Pressable} from "react-native";
import { PauseIcon } from "../assets/icons/PauseIcon";
import { StopIcon } from "../assets/icons/StopIcon";
import { PlayIcon } from "../assets/icons/PlayIcon";
import { useState } from "react";

type StopPauseButtonProps = {
  type: "stop" | "pause";
  onPress: () => void;
}


export function StopPauseButton({ type, onPress }: StopPauseButtonProps) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const handlePress = () => {
    if (type === 'pause') {
      setButtonPressed(!buttonPressed);
      console.log(buttonPressed)
      console.log('entrou')
    }
    onPress();
    // Você pode chamar mais funções aqui
  };
  return (
    <Pressable 
      onPress={handlePress} 
      style={{ 
        flexDirection: 'row', 
        width: 140, 
        height: 120, 
        alignItems: 'center', 
        borderRadius: 12, 
        justifyContent: 'center', 
        backgroundColor: type === 'stop' ? '#B42512' : '#12B418' 
      }}
    >
      {type === 'pause' ? (buttonPressed ? <PlayIcon /> : <PauseIcon />) : <StopIcon />}
    </Pressable>
  );
}