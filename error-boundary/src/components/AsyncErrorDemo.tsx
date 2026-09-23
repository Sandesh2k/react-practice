import { useState } from "react";

function AsyncErrorDemo() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);

      const response = await fetch(
        "https://invalid-api.example.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();

      setData(JSON.stringify(result));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h2>Async Error Demo</h2>

      <button onClick={fetchData}>
        Fetch Users
      </button>

      {error && (
        <p>
          Error: {error}
        </p>
      )}

      {data && (
        <p>
          {data}
        </p>
      )}
    </div>
  );
}

export default AsyncErrorDemo;