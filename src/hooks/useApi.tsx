import { useCallback, useState } from 'react';
import rollbar from '../utils/rollbar';
import { Endpoint } from '../typings/endpoint';
import { NewData } from '../typings/newData';
import { LogArgument } from 'rollbar';
import { showToast } from '../utils/showToast';

type ApiResource<T> = {
  data: T[];
  loading: boolean;
  error: unknown;
  getData: (endpoint: Endpoint) => Promise<T[]>;
  create: (endpoint: Endpoint, newData: NewData) => Promise<void>;
  update: (endpoint: Endpoint, newData: NewData) => Promise<void>;
  deleteData: (endpoint: Endpoint, id: number) => Promise<void>;
};

const useApi = <T extends { id: number }>() => {
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL;
  const [resource, setResource] = useState<ApiResource<T>>({
    data: [],
    loading: false,
    error: null,
    getData: async () => {
      return [];
    },
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
    async (endpoint: Endpoint): Promise<T[]> => {
      setResource((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`${baseURL}/${endpoint}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: T[] = await response.json();
        setResource((prev) => ({ ...prev, data, loading: false }));
        return data;
      } catch (err) {
        showToast('Erro ao consultar as postagens', 'error');
        handleError(err, 'Erro ao buscar os dados');
        return [];
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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResource((prev) => ({
          ...prev,
          data: [...prev.data, data],
          loading: false,
        }));
        showToast('Postagem criada com sucesso!', 'success');
        return data;
      } catch (err) {
        showToast('Erro ao criar a postagem', 'error');
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
        showToast('Postagem atualizada com sucesso!', 'success');
      } catch (err) {
        showToast('Erro ao atualizar a postagem', 'error');
        handleError(err, 'Erro ao atualizar os dados');
      }
    },
    [baseURL]
  );

  const deleteData = useCallback(
    async (endpoint: Endpoint, id: number) => {
      setResource((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`${baseURL}/${endpoint}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setResource((prev) => ({
          ...prev,
          data: prev.data.filter((item) => item.id !== id),
          loading: false,
        }));
        const data = await response.json();
        setResource((prev) => ({
          ...prev,
          data: [...prev.data, data],
          loading: false,
        }));
        showToast('Postagem excluída com sucesso!', 'success');
      } catch (err) {
        showToast('Erro ao excluir a postagem', 'error');
        handleError(err, 'Erro ao deletar os dados');
      }
    },
    [baseURL]
  );

  return { ...resource, getData, create, update, deleteData };
};

export default useApi;
