import { Icon as I, IconProps as IProps, useTheme } from "@rneui/themed";
import { Platform } from "react-native";

interface PlatformColors {
    primary: string;
    secondary: string;
    grey0: string;
    searchBg: string;
    success: string;
    error: string;
    warning: string;
}

export type IconProps = IProps & {
  color?: string | keyof PlatformColors,
  mc?: string,
  fontisto?: string,
};

export function Icon({ color, mc, fontisto, ...props}: IconProps) {
  const { theme: { colors }} = useTheme();
  const themeColors = Object.keys(colors).filter(v => v === 'platform');
  let c: string | undefined = undefined;
  if (color !== undefined && themeColors.find(v => v === color)) c = colors[(color as keyof PlatformColors)];
  else c = color;

  if (mc !== undefined ) {
    props.type="material-community";
    props.name=mc;
  }
  if (fontisto !== undefined ) {
    props.type="fontisto";
    props.name=fontisto;
  }
  return <I color={c} style={{ marginEnd: 4 }} {...props} />
}