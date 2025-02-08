import { Colors, FAB as F, FABProps, useTheme } from '@rneui/themed'
import { Href, useRouter } from 'expo-router';
import { Icon } from 'react-native-vector-icons/Icon';

export type ThemedFabProps = FABProps & { variant?: keyof Colors, href?: Href }

export function FAB({ children, icon, variant, href, onPress, color: clr, ...props}: ThemedFabProps ) {
  const { theme: { colors }} = useTheme()
  const router = useRouter()
  const color = (variant && colors[variant]) ? colors[variant] : clr;

  return <F 
    // visible={true} 
    icon={{name: 'plus', color: 'white', ...(icon as Icon) }} 
    // placement='right' style={{ margin: 20 }} 
    onPress={href ? () => router.push(href) : onPress}
    color={color?.toString()}
    {...props} />
}
