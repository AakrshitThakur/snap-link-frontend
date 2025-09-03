import { useState, useEffect, useRef, useCallback } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: T | null;
};

// generic <T> to set data type from the caller side
export function useFetch<T>(
  url: string,
  options?: RequestInit,
  interval: number = 0 // interval in ms, 0 = no repeat
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // To abort prev running api call
  const controllerRef = useRef<AbortController | null>(null);

  // returning memoized version to call unique APIs
  const fetchData = useCallback(async () => {
    if (!url) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    // cancel previous request
    controllerRef.current?.abort();

    // create new abort for new api call
    controllerRef.current = new AbortController();

    try {
      const res = await fetch(url, {
        ...options,
        signal: controllerRef.current.signal,
      });
      if (!res.ok) {
        const json = (await res.json()) as T;
        return setState({ data: null, loading: false, error: json });
      }
      const data = (await res.json()) as T;

      setState({ data, loading: false, error: null });
    } catch (err) {
      if (err instanceof Error) {
        setState({ data: null, loading: false, error: err.message as T });
      } else {
        setState({ data: null, loading: false, error: err as T });
      }
    }
  }, [url, options]);

  // fetching api on unique fetchData
  useEffect(() => {
    fetchData();

    let timer: ReturnType<typeof setInterval>;
    if (interval > 0) {
      timer = setInterval(fetchData, interval);
    }

    return () => {
      controllerRef.current?.abort();
      if (timer) clearInterval(timer);
    };
  }, [fetchData, interval]);

  return { ...state };
}
