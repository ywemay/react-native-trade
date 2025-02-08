import { View as V, ViewProps } from "react-native";
import { useTheme } from "@rneui/themed";

export function View({ style, ...props }: ViewProps) {
  const { theme: { colors } } = useTheme();

  const basic = {
    backgroundColor: colors.background,
    padding: 6,
  };

  return <V style={[basic, style]} {...props} />;
}