import { FormEvent, useState } from "react";
import { useWeather } from "./hooks/useWeather";

export default function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const { data, error, isLoading, isFetching, isError, refetch } = useWeather(city);

  function search(event: FormEvent) {
    event.preventDefault();
    const nextCity = input.trim();
    if (nextCity) setCity(nextCity);
  }

  return (
    <main className="weather-app">
      <h1>Weather App</h1>

      <form className="search" onSubmit={search}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter city"
          aria-label="City"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p className="status">Loading...</p>}

      {isError && !data && (
        <div className="error">
          <p>{error instanceof Error ? error.message : "Something went wrong."}</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}

      {data && (
        <section className="weather-card" aria-live="polite">
          <div className="weather-heading">
            <div>
              <h2>{data.location.name}</h2>
              <p>{data.location.country}{data.location.admin1 ? ` · ${data.location.admin1}` : ""}</p>
            </div>
            {isFetching && <span className="refreshing">Refreshing…</span>}
          </div>

          <div className="metrics">
            <div><span>Temperature</span><strong>{data.weather.current.temperature_2m}°C</strong></div>
            <div><span>Humidity</span><strong>{data.weather.current.relative_humidity_2m}%</strong></div>
            <div><span>Wind</span><strong>{data.weather.current.wind_speed_10m} km/h</strong></div>
          </div>

          {isError && <p className="refresh-error">Refresh failed. Showing the last successful result.</p>}
          <button className="refresh" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? "Refreshing..." : "Refresh weather"}
          </button>
        </section>
      )}

      {!city && <p className="hint">Search for a city to see its current weather.</p>}
    </main>
  );
}
