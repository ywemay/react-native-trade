import { ActivityIndicator } from "react-native";
import View from '@/components/ui/View';
import { Stack } from "expo-router";
import Text from "./Text";

export type LoadingActivityProps = {
  title?: string,
}

export function LoadingActivity (props: LoadingActivityProps) {
  const { title } = props;
  return <View style={{ padding: 20, flex: 1, flexDirection: 'column', height: '100%' }}>
      <Stack.Screen
        options={{
          title: title || 'Loading...'
        }} />
      <ActivityIndicator size={50} />
      <Text>Loading...</Text>
  </View>
}