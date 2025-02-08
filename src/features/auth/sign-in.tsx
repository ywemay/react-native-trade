import { StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import {
  Show,
  Text,
  TextInput,
  Button,
  Icon,
} from '../../ui';
import { Stack } from 'expo-router';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../providers';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};


const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { fetchSession } = useAuth();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    await fetchSession();
    
    setLoading(false);
  }

  return (
    <Show style={{justifyContent: 'center'}}>
      <Stack.Screen options={{ title: 'Sign in' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        secureTextEntry
      />

      <Button
        onPress={signInWithEmail}
        disabled={loading}
        title={loading ? 'Signing in...' : 'Sign in'}
        icon={<Icon name="sign-in" type="font-awesome" color="white" />}
      />
      {/* <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link> */}
    </Show>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;
