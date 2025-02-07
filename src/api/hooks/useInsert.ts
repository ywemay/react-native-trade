import { supabase } from '../../utils/supabase';
import { useMutation } from '@tanstack/react-query';
import { useOnSuccess } from './useOnSuccess';

export const useInsert = (props: {
    table: string,
    sanitize?: (v:any) => any,
}) => {

  const { table, sanitize, ...rest } = props;
  const onSuccess = useOnSuccess(props);

  return useMutation({
    async mutationFn(values) {
      if (typeof sanitize === 'function') sanitize(values);
      let query = supabase
        .from(table)
        .insert(values).select();

      const rez = await query;
      return rez;
    },
    ...rest,
    onSuccess
  });
}
