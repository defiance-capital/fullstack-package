import { useState } from 'react';

export function useMutation<TData, TVariables>(apiFn: (params: TVariables) => Promise<TData>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutate = async (variables: TVariables) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(variables);
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      return undefined;
    }
  };

  return { mutate, loading, error, data };
}
