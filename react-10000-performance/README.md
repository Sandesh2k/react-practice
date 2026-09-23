# React 10,000 Items Performance Lab

A TypeScript React experiment that compares four list-rendering implementations:


### 1. Baseline

All 10,000 `ItemRow` components are part of the rendered tree. A parent update can cause the whole list to render again. The browser also has to maintain a very large DOM tree.

### 2. `React.memo`

`React.memo` can skip a row when its props are shallowly equal. However, this version intentionally passes a new inline callback to every row:

```tsx
onSelect={(id) => onSelect(id)}
```

That callback has a new identity on every parent render, so the memoized row sees a changed prop. In this experiment, `React.memo` alone therefore demonstrates an important limitation: memoization is only useful when the props remain stable.

### 3. `React.memo` + `useCallback`

`useCallback` keeps the callback reference stable:

```tsx
const handleSelect = useCallback((id: number) => onSelect(id), [onSelect])
```

Now a parent render can be skipped by memoized rows because their `item`, `selected`, and `onSelect` props are unchanged. The exact profiler improvement depends on the browser and machine.

### 4. Windowing

`react-window` renders only the visible slice of the 10,000-row list. Scrolling recycles row DOM nodes instead of keeping 10,000 rows mounted. This reduces initial DOM work and memory pressure substantially for large lists.

## Profiler screenshots

- [Baseline — before optimization](base.png)
- [React.memo](react-memo.png)

- [Memo + useCallback](./memo-usecallback.png)

- [Windowed — after optimization](./window.png)

## Key takeaway

`React.memo` and `useCallback` optimize **unnecessary re-renders**. Windowing solves a different problem: it reduces the amount of UI that exists in the DOM at the same time. For a 10,000-item list, the strongest result usually comes from combining stable row props with virtualization rather than treating these techniques as interchangeable.
