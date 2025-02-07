import { supabase } from '../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export interface useOneProps {
    table: string,
    id: string,
    queryKey: string[],
    sanitize?: (d:any) => any,
    fields: string,
} 

export const useOne = ({ table, id, queryKey, sanitize, fields }: useOneProps) => {
  return useQuery({
    queryKey: queryKey || [ table, id ],
    queryFn: async () => {
      if (!id || id === undefined) return null;
      const { data, error } = await supabase
        .from(table)
        .select(fields || '*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return sanitize ? sanitize(data) : data;
    },
  });
}