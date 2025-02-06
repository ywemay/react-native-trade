import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from 'react-native-session-storage';
const isWeb = Platform.OS === 'web';


const ExpoSecureStoreAdapter = 
isWeb ? {
  getItem: (key: string) => {
    return isWeb ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    isWeb ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    isWeb ? AsyncStorage.removeItem(key) : SecureStore.deleteItemAsync(key);
  },
} : 
{
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
     SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
