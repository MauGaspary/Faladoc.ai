// @ts-nocheck
import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

const RatingIcon = ({ imageSource, backgroundColor, onPress, isSelected }) => {
  
  const containerStyle = isSelected ? 'opacity-100' : 'opacity-40';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-16 h-16 rounded-3xl mr-2 items-center justify-center ${backgroundColor}`}
    >
      <View className={`w-10 h-10 ${containerStyle}`}>
        <Image
          source={imageSource}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default RatingIcon;
