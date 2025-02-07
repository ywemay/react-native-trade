import { supabase } from '../../utils/supabase';
import { useMutation } from '@tanstack/react-query';
import { useOnSuccess } from './useOnSuccess';

export const useUpdate = (props:{
  table: string,
  invalidateKey?: any,
  sanitize?: (p:any) => any,
}) => {
  
  const { table, invalidateKey, sanitize, ...rest } = props;
  const onSuccess = useOnSuccess(props);

  const result = useMutation({
    
    async mutationFn({id, ...data}) {
      if (typeof sanitize === 'function') sanitize(data);
    const query = supabase
        .from(table)
        .update(data);
      if (Array.isArray(id)) return await query.in('id', id).select();
      else return await query.eq('id', id).single();
    },
    ...rest,
    onSuccess,
    
  });

  return result;
}