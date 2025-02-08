import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import { APIEvents } from '../api/events';

const { 
  EXPO_PUBLIC_OCR_API_URL: URL,
  EXPO_PUBLIC_OCR_APP_KEY: KEY,
} = process.env;

export interface useOCRProps extends APIEvents {
  lang: string,
}

export default function useOCR({ lang, onSuccess, onError, onSettled }:useOCRProps) {

  const [ loading, setLoading ] = useState(false);
  const { session: { access_token: token } } = useAuth()
  
  const scan = ({ image }) => {

    const { uri, mimeType, fileName } = image;

    setLoading(true);

    const file = {
      uri: uri
      , type: mimeType, name: fileName
    };

    const headers = { 
      'content-type': 'multipart/form-data',
      'x-app-key': KEY,
      'x-api-token': `${token}`,
    } 

    const form = new FormData();
    form.append("file", file);
    axios.post(`${URL}/ocr`, form, { 
      headers, 
        params: { 
          l: lang,
        }
      })
      .then(response => {
        setLoading(false);
        onSuccess && onSuccess(response.data);
        onSettled && onSettled(response.data, null);
      })
      .catch(error => {
        setLoading(false);
        const e = error.response?.data || error;
        onError && onError(e);
        onSettled && onSettled(null, e);
      });
  }

  return { scan, loading }
}