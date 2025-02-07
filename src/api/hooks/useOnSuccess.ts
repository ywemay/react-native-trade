import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';

export interface useOnSuccessProps {
    table: string,
    invalidateKey?: InvalidateQueryFilters<any, any, any, any>,
    onSuccess?: any,
}

export const useOnSuccess = ({ table, invalidateKey, onSuccess }: useOnSuccessProps) => {

  const queryClient = useQueryClient();

  const f = async (...args:any[]) => {
    try {

      await queryClient.invalidateQueries(invalidateKey === undefined ? [ table ] as InvalidateQueryFilters: invalidateKey);
      if (onSuccess !== undefined && typeof onSuccess === 'function') onSuccess(...args);
    } catch(e) {
      console.error(e);
    }
  }
  return f;
}
