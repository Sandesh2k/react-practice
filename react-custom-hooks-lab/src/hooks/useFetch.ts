import { useEffect, useState } from "react";
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    setState({ data: null, loading: true, error: null });
    (async () => {
      try {
        const r = await fetch(url, { signal: controller.signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = (await r.json()) as T;
        if (mounted) setState({ data, loading: false, error: null });
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        if (mounted)
          setState({
            data: null,
            loading: false,
            error: e instanceof Error ? e : new Error("Request failed"),
          });
      }
    })();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [url]);
  return state;
}
