import useThemeColors from "@/hooks/useThemeColors";
import { SafeAreaProvider, SafeAreaProviderProps, SafeAreaView } from "react-native-safe-area-context";

export function FullSafeArea({ children, style, ...rest }:SafeAreaProviderProps) {
  const colors = useThemeColors();
  return <SafeAreaProvider 
      style={[ style, {
        backgroundColor: colors.grey5
      }]}
      {...rest}
    >
      <SafeAreaView>{children}</SafeAreaView>
      </SafeAreaProvider>
}