import RenderErrorDemo from "./components/RenderErrorDemo";
import AsyncErrorDemo from "./components/AsyncErrorDemo";

function App() {
  return (
    <main>
      <h1>React Error Handling Demo</h1>

      <section>
        <h2>1. Render Error</h2>

        <RenderErrorDemo />
      </section>

      <hr />

      <section>
        <AsyncErrorDemo />
      </section>
    </main>
  );
}

export default App;