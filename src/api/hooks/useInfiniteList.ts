import { supabase } from '../../utils/supabase';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useListProps } from './useList';

export const useInfiniteList = ({ table, rpp, queryKey, alterQuery, fields }:useListProps)  => {
  return useInfiniteQuery({
    queryKey: queryKey || [ table ],
    queryFn: async ({ pageParam }) => {
      try {
        const offset = pageParam * rpp;
        let query = supabase
          .from(table)
          .select(fields || '*');

        if (typeof alterQuery === 'function') 
          query = alterQuery(query);     

        query = query.range(offset || 0, rpp || 8)

        const { data, error } = await query;
        if (error) console.error(error);
        return data;
      }
      catch(error) {
        console.error(error);
      }
    },
    initialPageParam: 0,
    getNextPageParam: ({ nextCursor }:any) => {
      return nextCursor || null
    },
  })
}