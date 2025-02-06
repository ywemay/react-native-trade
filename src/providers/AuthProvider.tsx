import { Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  session: Session | null,
  loading: boolean,
  profile: any,
  fetchSession: () => Promise<boolean>,
}

const AuthContext = createContext({} as AuthContextProps);

export default function AuthProvider({ children }:PropsWithChildren) {

  const [ session, setSession ] = useState<Session | null>(null);
  const [ profile, setProfile ] = useState(null);
  const [ loading, setLoadingState ] = useState(true);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      
      const { data: { session: s } } = await supabase.auth.getSession();
      
      await setSession(s);

      if (s) {
        
        const { data: p, error: pError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', s.user.id)
          .single();

        const { data: permissions, error: permissions_error } = await supabase
          .from('my_permissions')
          .select('permission');
        
        if(permissions_error) throw new Error(permissions_error.message);

        p.custom_permissions = permissions.map(v => v.permission);

        await setProfile(p || null);
      } 

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      setLoadingState(false);
      return true;
    } catch (error) {
      setLoadingState(false);
      console.error(error);
      return false;
    }
  };

  const value = {
    session,
    loading,
    profile,
    fetchSession,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);