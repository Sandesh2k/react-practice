# Weather App — TanStack Query

This rebuild converts the original JavaScript weather app to React + TanStack Query while keeping the same Open-Meteo geocoding and weather APIs.

## Requirements implemented

- **5-minute caching:** `staleTime: 5 * 60 * 1000`
- **Optimistic refetch UI:** previous weather data stays visible while a new request runs; `isFetching` shows `Refreshing…`
- **Exponential retry:** 3 retries with `1s → 2s → 4s` delays, capped at 30 seconds
- **Query states:** `isLoading`, `isError`, `error`, `data`, and `isFetching`
- **Request cancellation:** TanStack Query passes an `AbortSignal` to `fetch`, so old requests are cancelled when the query changes/unmounts

## Approach

The city is part of the query key: `['weather', city]`. This gives each searched city its own cache entry. TanStack Query manages the request lifecycle, caching, retries, cancellation, and loading/error state instead of manually managing these with `useEffect` and `useState`.

`placeholderData: previousData => previousData` keeps the last result visible when switching to another city while the new query loads. This avoids clearing the UI and gives a smoother refetch experience.

## Run

```bash
npm install
npm run dev
```

## Original app preserved

The original app's behavior is retained: enter a city, find it through Open-Meteo geocoding, fetch current temperature/humidity/wind, and retry when a request fails.
