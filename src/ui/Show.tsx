import { StyleProp, View, ViewStyle } from "react-native"
import { useTheme } from "@rneui/themed";
import { PropsWithChildren } from "react";

export function Show({children, style, ...props}:PropsWithChildren & { style?: StyleProp<ViewStyle> }) {

  const { theme: { colors }} = useTheme();
  const s = {
    backgroundColor: colors.background,
    color: colors.black,
    flex: 1,
    padding: 10,
  }

  return <View style={[style, s]} {...props}>{children}</View>
}