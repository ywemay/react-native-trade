import { ViewProps } from "react-native";
import View from "./View";
import { Icon, IconProps } from '@rneui/themed';

export function Selected({ style, selected, icon, ...props}:ViewProps & { icon?: IconProps, selected?: boolean}) {

  if (!selected) return null;

  const { name, color, ...rest } ={ name: 'check-box', color: 'green', ...icon };

  return <View style={[ style, {
    position: 'absolute',
    zIndex: 90, 
    padding: 0, 
    bottom: 0, 
    margin: 10, 
  }, style ]} {...props}>
    <Icon name={name} color={color} {...rest} />
  </View>
}