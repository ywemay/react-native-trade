import { Button as B, ButtonProps } from '@rneui/themed'

export function Button({ buttonStyle, children, ...props }:ButtonProps) {
  const { type } = props;
  const bs = type === 'outline' ? { borderWidth: 1.3 } : {}
  return <B 
    radius='xl'
    buttonStyle={[ buttonStyle, bs ]}
    {...props} 
  />
}
