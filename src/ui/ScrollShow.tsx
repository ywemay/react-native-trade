import { ScrollView } from "react-native";
import Show from "./Show";
import React, { PropsWithChildren } from "react";

export function ScrollShow({ children, ...props}:PropsWithChildren){
  return <Show {...props}>
    <ScrollView style={{ flex: 1 }}>
      {children}
    </ScrollView>
  </Show>
}