import { supabase } from '../../utils/supabase';
import { useState, useEffect } from 'react';

export const useFetchItems = (props: {
    table: string,
    fields?: string,
    onError?: (e:any) => void,
    limit?: number,
    searchQuery?: (q: any, s: string) =>any,
}) => {
  const { table, fields, onError, limit, searchQuery } = props;
  const defaultState = { list: [], offset: 0, limit: limit || 12, search: '' }
  const [ state, setState ] = useState(defaultState);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  const refresh = () => {
    setState(defaultState);
    fetchItems();
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const { offset, limit, list, search } = state;

      let query = supabase
        .from(table)
        .select(fields || '*')
        .range(offset, offset + limit);
        // .order('created_at', { ascending: false });

      if (search !== '') { 
        if (typeof searchQuery === 'function') {
          query = searchQuery(query, search);
        }
      }

      const { data, error } = await query;
      if (!data || data.length === 0 || error) {
        setIsLoading(false);
        return;
      }

      setState({
            list: list.concat(data),
            offset: offset + 13,
            limit: limit || 12,
            search
        });
      
      setIsLoading(false);
    } catch(e) {
      setIsLoading(false);
      console.error(e)
      if (e) setError(e);
      typeof onError === 'function' ? onError(e) : console.error(e);
    }
  }

  const handleSearch = async (search: string) => {
    await setState({ ...defaultState, search })
    fetchItems();
  }
  
  return { fetchItems, state, setState, search: handleSearch, refresh, isLoading, error }
}