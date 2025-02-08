import { useAuth } from '../../providers/AuthProvider';
import { Redirect } from 'expo-router';
import { PropsWithChildren } from 'react'

export default function AuthLayout({children}: PropsWithChildren) {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />;
  }

  return children;
}
