import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { supabase } from '@/lib/supabase';
import { addFilters } from '@/lib/filters'

export const useInfiniteScroll = ({
  table, 
  fields,
  limit = 10,
  filters,
  searchQuery,
  alterQuery,
  onData,
  queryKey: queryKeyReplace
}) => {
  const queryKey = queryKeyReplace ? queryKeyReplace : [table, ..._.values(_.omitBy(filters || {}, _.isEmpty))].filter(
    c => Boolean(c) && !_.isEmpty(c),
  );
  const [ isRefreshing, setIsRefreshing ] = useState(false)
  // const [ isLoading, setIsLoading ] = useState(false)
  const [ search, setSearch ] = useState('');

  const queryClient = useQueryClient();

  const queryFn = async ({ pageParam = 1 }) => {
    try {
      // if (pageParam === 1) await setIsLoading(true);
      const offset = (pageParam - 1) * limit;
      let query = supabase
        .from(table)
        .select(fields || '*')
        .range(offset, offset + limit - 1 );
        // .order('created_at', { ascending: false });

      if (typeof alterQuery === 'function') {
        query = alterQuery(query);
      }

      await addFilters(query, filters);
      
      if (search !== '') { 
        if (typeof searchQuery === 'function') {
          query = searchQuery(query, search);
        }
      }

      const { data, error } = await query;
      if (error) console.error(error);

      let finalData = data;

      if ( onData && onData !== undefined ) {
        if (Array.isArray(data) && data.length > 0) finalData = await onData(data);
      }

      // setIsLoading(false);
      return {
        data: finalData || [],
        nextPage: pageParam + 1,
      };
    }
    catch(e) {
      // setIsLoading(false);
      console.error(e); 
    }
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch, isLoading, page } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      if (!lastPage?.data) return lastPageParam + 1;
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam === 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  const doSearch = async (q) => {
    await setSearch(q);
    refetch();
  }

  const loadNext = useCallback(() => {
    hasNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const onRefresh = useCallback(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      queryClient.resetQueries(queryKey)
      .then(() =>
        refetch()
          .then(() => setIsRefreshing(false))
          .catch(() => setIsRefreshing(false))
        ).catch(() => setIsRefreshing(false));
    }
  }, [isRefreshing, refetch]);

  const { pages } = data || {};

  const flattenData = useMemo(() => {
    return pages && pages !== undefined ? pages.flatMap(page => page !== undefined ? page.data : undefined) : [];
  }, [pages]);

  return {
    data: flattenData.filter(i => i !== null),
    onEndReached: loadNext,
    isRefreshing,
    isLoading,
    onRefresh,
    isFetchingNextPage,
    setSearch,
    doSearch,
    search
  };
};