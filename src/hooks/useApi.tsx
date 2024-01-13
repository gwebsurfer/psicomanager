import { useState } from 'react';

type ApiResource<T> = {
  data: T[];
  loading: boolean;
  error: unknown;
  getData: (endpoint: string) => Promise<void>;
  create: (endpoint: string, newData: T) => Promise<void>;
  update: (endpoint: string, newData: T) => Promise<void>;
  delete: (endpoint: string, newData: T) => Promise<void>;
};

const useApi = <T,>() => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [resource, setResource] = useState<ApiResource<T>>({
    data: [],
    loading: false,
    error: null,
    getData: async (endpoint: string) => {
      setResource((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`${baseURL}/${endpoint}`);
        const data = await response.json();
        setResource((prev) => ({ ...prev, data, loading: false }));
      } catch (err) {
        setResource((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Something went wrong',
          loading: false,
        }));
      }
    },
    create: async (endpoint: string, newData: T) => {
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
        setResource((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Something went wrong',
          loading: false,
        }));
      }
    },
    update: async (endpoint: string, newData: T) => {
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
        setResource((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Something went wrong',
          loading: false,
        }));
      }
    },
    delete: async (endpoint: string, newData: T) => {
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
        setResource((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Something went wrong',
          loading: false,
        }));
      }
    },
  });

  return resource;
};

export default useApi;
