import React from 'react';
import { FlatList as RNFlatList, FlatListProps } from 'react-native';
import { useTheme } from '@rneui/themed';

interface ThemedFlatListProps<ItemT> extends FlatListProps<ItemT> {
  // Add any additional props here if needed
}

const ThemedFlatList: React.FC<ThemedFlatListProps<any>> = (props) => {
  const { theme: { colors } } = useTheme();

  return (
    <RNFlatList
      style={[props.style, { backgroundColor: colors.grey5 }]}
      {...props}
    />
  );
};

export default ThemedFlatList;
