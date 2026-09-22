import { useState } from "react";
import { Tabs } from "./components/Tabs";
import "./index.css";

function UncontrolledExample() {
  return (
    <section className="demo-card">
      <h2>Uncontrolled tabs</h2>
      <p>
        <code>defaultValue="a"</code> lets Tabs own its state.
      </p>
      <Tabs defaultValue="a">
        <Tabs.List aria-label="Uncontrolled example">
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
          <Tabs.Trigger value="c">Tab C</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="a">
          <h3>Panel A</h3>
          <p>You are viewing content for Tab A.</p>
        </Tabs.Panel>
        <Tabs.Panel value="b">
          <h3>Panel B</h3>
          <p>You are viewing content for Tab B.</p>
        </Tabs.Panel>
        <Tabs.Panel value="c">
          <h3>Panel C</h3>
          <p>You are viewing content for Tab C.</p>
        </Tabs.Panel>
      </Tabs>
    </section>
  );
}
function ControlledExample() {
  const [activeTab, setActiveTab] = useState("a");
  return (
    <section className="demo-card">
      <h2>Controlled tabs</h2>
      <p>
        Parent state controls the selected tab: <strong>{activeTab}</strong>
      </p>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List aria-label="Controlled example">
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="a">
          <h3>Panel A</h3>
          <p>The parent owns the active value.</p>
        </Tabs.Panel>
        <Tabs.Panel value="b">
          <h3>Panel B</h3>
          <p>The parent owns the active value.</p>
        </Tabs.Panel>
      </Tabs>
    </section>
  );
}
export default function App() {
  return (
    <main className="app">
      <header>
        <p className="eyebrow">React Accessibility Lab</p>
        <h1>Accessible Tabs</h1>
        <p className="intro">
          Compound components using Context, ARIA roles, controlled/uncontrolled
          state, and keyboard navigation.
        </p>
      </header>
      <div className="keyboard-help" role="note">
        <strong>Keyboard:</strong> Arrow Left/Right moves between tabs. Home/End
        jumps to the first/last tab.
      </div>
      <UncontrolledExample />
      <ControlledExample />
    </main>
  );
}
