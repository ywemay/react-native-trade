import { FlatList as List, FlatListProps } from 'react-native';
import { useTheme } from '@rneui/themed';

export function FlatList({ style, ...props}:FlatListProps<any>) {

  const { theme: { colors } } = useTheme();

  return (
    <List
      style={[ style, { backgroundColor: colors.grey5 }]}
      {...props}
    />
  );
}

export function FlatListGrid({ contentContainerStyle, columnWrapperStyle,... props }:FlatListProps<any>) {
  return <FlatList
    contentContainerStyle={[ contentContainerStyle, { gap: 6, padding: 6 }]}
    columnWrapperStyle={[ columnWrapperStyle, { gap: 6 }]}
    {...props} />
}
