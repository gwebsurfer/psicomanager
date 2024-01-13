import { useCallback, useState } from 'react';
import rollbar from '../utils/rollbar';
import { Endpoint } from '../typings/endpoint';
import { NewData } from '../typings/newData';
import { LogArgument } from 'rollbar';

type ApiResource<T> = {
  data: T[];
  loading: boolean;
  error: unknown;
  getData: (endpoint: Endpoint) => Promise<void>;
  create: (endpoint: Endpoint, newData: NewData) => Promise<void>;
  update: (endpoint: Endpoint, newData: NewData) => Promise<void>;
  deleteData: (endpoint: Endpoint, newData: NewData) => Promise<void>;
};

const useApi = <T,>() => {
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL;
  const [resource, setResource] = useState<ApiResource<T>>({
    data: [],
    loading: false,
    error: null,
    getData: async () => {},
    create: async () => {},
    update: async () => {},
    deleteData: async () => {},
  });

  const handleError = (err: unknown, message: string) => {
    const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro';
    rollbar.error(message, err as LogArgument);
    setResource((prev) => ({
      ...prev,
      error: errorMessage,
      loading: false,
    }));
  };

  const getData = useCallback(
    async (endpoint: Endpoint) => {
      setResource((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`${baseURL}/${endpoint}`);
        const data = await response.json();
        setResource((prev) => ({ ...prev, data, loading: false }));
      } catch (err) {
        handleError(err, 'Erro ao buscar os dados');
      }
    },
    [baseURL]
  );

  const create = useCallback(
    async (endpoint: Endpoint, newData: NewData) => {
      setResource((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`${baseURL}/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
        const data = await response.json();
        setResource((prev) => ({
          ...prev,
          data: [...prev.data, data],
          loading: false,
        }));
      } catch (err) {
        handleError(err, 'Erro ao salvar os dados');
      }
    },
    [baseURL]
  );

  const update = useCallback(
    async (endpoint: Endpoint, newData: NewData) => {
      setResource((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`${baseURL}/${endpoint}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
        const data = await response.json();
        setResource((prev) => ({
          ...prev,
          data: [...prev.data, data],
          loading: false,
        }));
      } catch (err) {
        handleError(err, 'Erro ao atualizar os dados');
      }
    },
    [baseURL]
  );

  const deleteData = useCallback(
    async (endpoint: Endpoint, newData: NewData) => {
      setResource((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`${baseURL}/${endpoint}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
        const data = await response.json();
        setResource((prev) => ({
          ...prev,
          data: [...prev.data, data],
          loading: false,
        }));
      } catch (err) {
        handleError(err, 'Erro ao deletar os dados');
      }
    },
    [baseURL]
  );

  return { ...resource, getData, create, update, deleteData };
};

export default useApi;
