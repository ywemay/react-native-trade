import { StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";

export function useTextInputStyle({ error, style } = {}) {

  const { theme: { colors } } = useTheme();

  return { 
    ...styles.container, 
    borderColor: error ? colors.error : colors.greyOutline,
    color: colors.black, 
    ...style
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 2,
    marginBottom: 2,
  },
});