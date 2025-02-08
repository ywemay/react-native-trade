import { useTheme } from '@rneui/themed';
import Toast from 'react-native-root-toast';

const types = {
  error: 'red',
  warning: 'orange',
  success: 'green',
}

export default function useToast() {

  const { theme: { colors }} = useTheme();

  function Show(msg, { type, ...props} = { type: 'info'}) {

    const backgroundColor = types[type || 'info'] || colors.black;

    Toast.show(msg, { 
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor,
      ...props
    });
  }

  function Success(msg, more = {}) {
    Show(msg, { type: 'success', ...more});
  }

  function Error(msg, more = {}) {
    console.log('Show error', msg);
    let message;
    if (typeof msg === 'string') message = msg;
    else if (msg?.message) message = msg.message;
    else msg.toString();
    if (typeof message !== 'string') message='An error occurred.'
    Show(message, { type: 'error', ...more});
  }

  return { Show, Success, Error }
}