import { View, Image, TouchableOpacity} from "react-native";
import { PauseIcon } from "../assets/icons/PauseIcon";
import { StopIcon } from "../assets/icons/StopIcon";

type StopPauseButtonProps = {
  type: "stop" | "pause";
  onPress: () => void;
}

export function StopPauseButton({ type, onPress }: StopPauseButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className={`flex flex-row w-[140px] h-[120px] items-center rounded-[12px] justify-center ${type === 'stop' ? 'bg-[#B42512]' : 'bg-[#12B418]'}`  }>
      {type === 'pause' ? <PauseIcon /> : <StopIcon />}
    </TouchableOpacity>
  );
}