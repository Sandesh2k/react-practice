import { useCallback, useRef, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { usePrevious } from "./hooks/usePrevious";
interface Post {
  id: number;
  title: string;
  body: string;
}
export default function App() {
  const [q, setQ] = useState("react");
  const debounced = useDebounce(q, 500);
  const [stored, setStored] = useLocalStorage("demo-name", "Developer");
  const previous = usePrevious(q);
  const wide = useMediaQuery("(min-width:800px)");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const outside = useCallback(() => setCount((c) => c + 1), []);
  useOnClickOutside(ref, outside);
  const { data, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${debounced === "react" ? 1 : 2}`,
  );
  return (
    <main>
      <p>React Custom Hooks Lab</p>
      <h1>Six reusable hooks</h1>
      <section className="grid">
        <article>
          <h2>useDebounce</h2>
          <input value={q} onChange={(e) => setQ(e.target.value)} />
          <p>Current: {q}</p>
          <p>Debounced: {debounced}</p>
          <p>Previous: {previous ?? "—"}</p>
        </article>
        <article>
          <h2>useLocalStorage</h2>
          <input value={stored} onChange={(e) => setStored(e.target.value)} />
          <p>Refresh to verify persistence.</p>
        </article>
        <article>
          <h2>useFetch</h2>
          {loading && <p>Loading...</p>}
          {error && <p role="alert">{error.message}</p>}
          {data && (
            <p>
              #{data.id} {data.title}
            </p>
          )}
        </article>
        <article>
          <h2>useOnClickOutside</h2>
          <div ref={ref} className="box">
            Click outside
          </div>
          <p>Outside clicks: {count}</p>
        </article>
        <article>
          <h2>useMediaQuery</h2>
          <p>Viewport: {wide ? "wide" : "narrow"}</p>
        </article>
        <article>
          <h2>Tests</h2>
          <p>
            Run <code>npm test</code>
          </p>
        </article>
      </section>
    </main>
  );
}
