import { supabase } from '../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export interface useListProps {
  table: string,
  queryKey: string[],
  alterQuery: (v:any) => any,
  rpp: number,
  fields: string,
}

export const useList = ({table, queryKey, alterQuery, rpp, fields}:useListProps) => {
  return useQuery({
    queryKey: queryKey || [table],
    queryFn: async ({ pageParam }) => {
      try {
        const offset = typeof pageParam  === 'string' ? parseInt(pageParam) * rpp : 0;
        let query = supabase
          .from(table)
          .select(fields || '*');

        if (typeof alterQuery === 'function') {
          query = alterQuery(query);     
        }

        query = query.range(offset || 0, rpp || 8)

        const { data, error } = await query;
        if (error) console.error(error);
        return data;
      }
      catch(error) {
        console.log(error);
      }
    },
  });
}
