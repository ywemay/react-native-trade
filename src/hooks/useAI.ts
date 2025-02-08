import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import { APIEvents } from '../api/events';

const { EXPO_PUBLIC_AI_API_URL: URL } = process.env;

export interface useAIProps extends APIEvents {
  model: string,
}

export default function useAI({ model, onSuccess, onError, onSettled }:useAIProps) {

  const [ loading, setLoading ] = useState(false);

  const { session } = useAuth()
  const { access_token: token } = { access_token: null, ...session } ;
  
  const generate = (body:any) => {

    const { prompt } = body;

    if (!prompt) {
      console.log('Prompt not provided.')
    }

    const payload = {
      model: model || 'llama3:8b', 
      stream: false, 
      ...body 
    }

    setLoading(true);

    axios.post(`${URL}/api/generate`, payload, { 
      headers: { 
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        }
      })
      .then((response: AxiosResponse) => {
        setLoading(false);
        onSuccess && onSuccess(response.data);
        onSettled && onSettled(response.data, null);
      })
      .catch(error => {
        const e = error.response?.data || error;
        setLoading(false);
        onError && onError(e);
        onSettled && onSettled(null, e);
      });
  }

  return { generate, loading }
}