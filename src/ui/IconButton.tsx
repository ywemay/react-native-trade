import { GestureResponderEvent, Pressable } from "react-native"
import { Icon, IconProps, useTheme } from "@rneui/themed"

export type IconButtonProps = {
  href?: string,
  asChild?: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined,
} & IconProps

export function IconButton({ href, asChild, onPress, name, ...props }:IconButtonProps) {
  const { theme: { colors } } = useTheme();

  return <Pressable onPress={onPress}>
    {({ pressed }) => (
      <Icon
        name={name || "plus"}
        type="material-community"
        size={25}
        color={colors.black}
        style={{ padding: 6, opacity: pressed ? 0.5 : 1 }}
        {...props}
      />
    )}
  </Pressable>

}