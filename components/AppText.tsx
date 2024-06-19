// AppText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const AppText: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.default, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Poppins',
  },
});

export default AppText;
