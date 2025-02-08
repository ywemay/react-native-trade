import { Colors, Text as T, TextProps, useTheme } from '@rneui/themed'

const sizes = {
  xsm: 8,
  sm: 10,
  md: 14,
  md2: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
}

export function Text({style, sz, variant, children, ...props}: TextProps & { sz?: keyof typeof sizes, variant?: keyof Colors } ) {
  const { theme: { colors } } = useTheme();
  const s = {
    fontSize: sizes[sz || 'md' ] || 18,
    color: variant === 'primary' ? colors.primary : colors.black,
  }
  return <T 
    style={[s, style]}
  {...props} />
}
