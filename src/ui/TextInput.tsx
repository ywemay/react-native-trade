import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

export function TextInput({ style, ...props }: React.ComponentProps<typeof RNTextInput>) {
  return <RNTextInput {...props} />;
}
