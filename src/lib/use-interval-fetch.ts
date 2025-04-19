import { useState, useEffect } from 'preact/hooks';

export interface FetchState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

// an swr like fetcher but 10000x smaller
export function useIntervalFetch<T>(
  url: string,
  refreshInterval: number = 0,
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    let initial = true;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const fetcher = async () => {
      if (initial) setIsLoading(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        if (json.error) throw new Error(json.error);

        if (!mounted) return;
        setData(json);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (initial && mounted) {
          setIsLoading(false);
          initial = false;
        }
      }
    };

    const startPolling = () => {
      fetcher();
      if (refreshInterval > 0) {
        intervalId = setInterval(fetcher, refreshInterval);
      }
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId as Parameters<typeof clearInterval>[0]);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startPolling();
      } else {
        stopPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (document.visibilityState === 'visible') {
      startPolling();
    } else {
      if (initial) setIsLoading(false);
    }

    return () => {
      mounted = false;
      controller.abort();
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [url, refreshInterval]);

  return { data, error, isLoading };
}
