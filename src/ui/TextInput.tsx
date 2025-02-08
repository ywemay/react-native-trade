import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';

export function TextInput({ style, children, ...props }: TextInputProps ) {
  return <RNTextInput style={[style]} {...props} />;
}
  