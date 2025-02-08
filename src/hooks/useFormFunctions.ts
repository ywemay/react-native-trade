import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function useFormFunctions({...props}) {
  
  const { 
    id,
    insert, 
    update,
    remove,
    validate, 
    setError,
    onCreated, 
    onUpdated, 
    onRemoved,
    ...other
   } = props;

  const { empty, existing } = {...other};

  const [ record, setRecord ] = useState({...empty, ...existing});
  const [ isLoading, setIsLoading ] = useState(false);
  const { id: uriID } = useLocalSearchParams();
  const router = useRouter();

  const isEdit = id === undefined ? !!uriID : !!id;
  
  // useEffect(() => {
  //   if (existing) {
  //     setRecord(existing)
  //   }
  // }, [existing]);

  const handleCreate = insert === undefined ? undefined : async () => {
    try {
      setIsLoading(true);
      if (validate !== undefined && !await validate(record)) {
        setIsLoading(false);
        return false;
      }

      insert(record, {
          setIsLoading,
          onSuccess: async (result) => {
            await setRecord(empty);
            await setIsLoading(false)
            onCreated ? onCreated(result) : router.back();
          },
        }
      );
    } catch(e) {
      setError('Failed to create')
      setIsLoading(false);
      console.error(e);
    }
  }
  
  const handleUpdate = update === undefined ? undefined : async () => {
    try {
      setIsLoading(true);
      if (!await validate(record)) {
        setIsLoading(false);
        return;
      }

      update(record,{
          onSuccess: async (result) => {
            await setRecord(empty);
            await setIsLoading(false);
            onUpdated ? onUpdated(result) : router.back();
          }
        });
      
    } catch(e) {
      setIsLoading(false);
      setError('Failed to update')
      console.error(e)
    }
  };

  const handleDelete = remove === undefined ? undefined : async () => {
    try {
      remove(record.id, {
        onSuccess: () => {
          setRecord(empty);
          onRemoved ? onRemoved(record.id) : router.back();
        }
      })
    } catch(e) {
      setError('Failed to remove');
      console.error(e)
    }
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
    record,
    setRecord,
    setField,
    isLoading,
    setIsLoading,
    isEdit,
    handleCreate,
    handleUpdate,
    handleSubmit,
    handleDelete,
  }
}