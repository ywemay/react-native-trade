import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useStorage(key, defaultValue) {

  const [ value, setValue ] = useState(defaultValue || false)

  const loadValue = async () => {
    const rez = await AsyncStorage.getItem(key);
    setValue(rez);
  }

  useEffect(() => {
    loadValue()
  }, {})

  const setVal = async (val) => {
    await AsyncStorage.setItem(key, typeof val !== 'string' ? val.toString() : val);
    setValue(val);
  }

  return [ value, setVal ]
}