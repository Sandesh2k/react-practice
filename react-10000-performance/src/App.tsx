import { useState } from 'react'
import { PerformanceList, useSelection, type Mode } from './ListImplementations'

const MODES: { id: Mode; label: string; detail: string }[] = [
  { id: 'baseline', label: '1. Baseline', detail: '10,000 rows; no memoization' },
  { id: 'memo', label: '2. React.memo', detail: 'Memoized rows, but unstable handler prop' },
  { id: 'memo-callback', label: '3. memo + useCallback', detail: 'Stable handler lets memo skip rows' },
  { id: 'windowed', label: '4. Windowing', detail: 'Only visible rows are mounted' },
]

export default function App() {
  const [mode, setMode] = useState<Mode>('baseline')
  const { selectedId, onSelect, tick, triggerParentRender } = useSelection()
  const current = MODES.find((item) => item.id === mode)!

  return (
    <main className="page">
      <header>
        <p className="eyebrow">React performance lab</p>
        <h1>10,000-item list</h1>
        <p className="subtitle">
          Compare rendering strategies with React DevTools Profiler. Use the parent-render button to
          isolate unnecessary row renders.
        </p>
      </header>

      <section className="controls" aria-label="Performance implementations">
        {MODES.map((item) => (
          <button
            key={item.id}
            className={mode === item.id ? 'active' : ''}
            onClick={() => setMode(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button className="secondary" onClick={triggerParentRender}>
          Trigger parent render ({tick})
        </button>
      </section>

      <section className="summary">
        <div>
          <span className="label">Implementation</span>
          <strong>{current.label}</strong>
        </div>
        <div>
          <span className="label">Rows in data</span>
          <strong>10,000</strong>
        </div>
        <div>
          <span className="label">Selected</span>
          <strong>{selectedId ? `Item ${selectedId}` : 'None'}</strong>
        </div>
        <div>
          <span className="label">What to inspect</span>
          <strong>{current.detail}</strong>
        </div>
      </section>

      <section className="profiler-tip">
        <strong>Profiler workflow:</strong> Open React DevTools → Profiler → Record → click
        “Trigger parent render” a few times → stop recording. Compare commits and row renders.
      </section>

      <section className="list-shell">
        <PerformanceList mode={mode} tick={tick} onSelect={onSelect} selectedId={selectedId} />
      </section>
    </main>
  )
}
