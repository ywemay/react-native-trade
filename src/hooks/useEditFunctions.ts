import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useOne, useInsert, useUpdate, useDelete } from '../api';
import useToast from "./useToast";
import { useQueryClient } from "@tanstack/react-query";

export default function useEditFunctions(props) {
  
  const { 
    id,
    validate, 
    onCreated, 
    onUpdated, 
    onRemoved,
    table,
    queryKey: queryKeyRewrite,
    empty,
    cleanup,
  } = props;

  const [ record, setRecord ] = useState(empty);
  const [ isLoading, setIsLoading ] = useState(false);
  const { id: uriID } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryKey = queryKeyRewrite || [ table ];
  const toast = useToast();

  const onError = (error) => {
    toast.Error(error);
    setIsLoading(false);
  }
  const onSettled = (_, error) => {
    if (!error) queryClient.invalidateQueries(queryKey);
    setIsLoading(false);
  }
  const common = { table, onError, onSettled };

  const { mutate: insert } = useInsert({ ...common, 
    onSuccess: (...args) => {
      toast.Success('Successfully created.');
      if (typeof onCreated === 'function') onCreated(...args);
      else router.back();
    }
  });
  
  const { mutate: update } = useUpdate({ ...common, 
    onSuccess: (...args) => {
      toast.Success('Successfully updated.');
      if (typeof onUpdated === 'function') onUpdated(...args);
    }
  });
  
  const { mutate: remove } = useDelete({ ...common, 
    onSuccess: (...args) => {
      toast.Success('Successfully removed.');
      if (typeof onRemoved === 'function') onRemoved(...args);
      else router.back();
    } 
  });

  const { data: existing, isLoading: dataIsLoading, error: dataError } 
    = useOne({ table, id: id === undefined ? uriID : id , onError});

  const isEdit = id === undefined ? !!uriID : !!id;
  
  useEffect(() => {
    if (isEdit) setIsLoading(dataIsLoading);
  }, [dataIsLoading]);

  useEffect(() => {
    if (existing && isEdit) {
      setRecord(existing)
    }
  }, [existing]);

  const cleanData = () => {
    return (cleanup !== undefined && typeof cleanup === 'function') ? cleanup(record) : record;
  }

  const handleCreate = insert === undefined ? undefined : async () => {
      setIsLoading(true);
      const data = cleanData();
      
      if (validate === undefined) {
        console.log('Validate undefined.')
        await insert(data);
        return true;
      }

      if (typeof validate !== 'function') {
        onError(new Error('validate is not a function.'));
        setIsLoading(false);
        return;

      }

      const validData = await validate(data);
      
      if (validData === false) {
        setIsLoading(false);
        return false;
      }
      await insert(validData === true ? data : validData);
  }
  
  const handleUpdate = update === undefined ? undefined : async () => {
      setIsLoading(true);
      const data = cleanData();
      if (!await validate(data)) {
        setIsLoading(false);
        return;
      }

      update(data);
  };

  const handleDelete = remove === undefined ? undefined : async () => {
    remove(record.id)
  }

  const handleSubmit = () => isEdit ? handleUpdate() : handleCreate();

  const setField = (key, val) => {
    setRecord(prev => {
      const change = {}
      change[key] = val;
      return {...prev, ...change}
    })
  }
  
  return { 
    id,
    record,
    setRecord,
    setField,
    error: dataError,
    isLoading,
    setIsLoading,
    isEdit,
    create: handleCreate,
    update: handleUpdate,
    submit: handleSubmit,
    remove: handleDelete,
  }
}