import { PropsWithChildren } from "react";
import View from "./View";
import Text from "./Text";

export function ListEmpty({ children, message }:{message?:string} & PropsWithChildren) {
  const msg = message || (children ? undefined : 'No items found.');

  return <View style={{ flex: 1 }}>
    {msg && <Text>{msg}</Text>}
    {children}
  </View>
} 