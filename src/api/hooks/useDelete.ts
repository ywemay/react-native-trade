import { supabase } from '../../utils/supabase';
import { useMutation } from '@tanstack/react-query';
import { useOnSuccess } from './useOnSuccess';

export const useDelete = (props:{
  table: string,
  invalidateKey?: any,
  sanitize?: (p:any) => any,
}) => {
  const {table, invalidateKey, ...rest } = props;
  const onSuccess = useOnSuccess(props);

  return useMutation({
    async mutationFn(id) {
      const { error } = Array.isArray(id) ?
        await supabase.from(table).delete().in('id', id) :
        await supabase.from(table).delete().eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
    },
    ...rest,
    onSuccess
  });
};