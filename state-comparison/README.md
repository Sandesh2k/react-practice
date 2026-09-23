# E-commerce Cart — Three State Management Approaches

A React + TypeScript cart implemented three times with **Context API + useReducer**, **Redux Toolkit**, and **Zustand**. All versions provide the same add/remove/increase/decrease/total behavior so the state-management approaches can be compared fairly.

## Approach

Shared `Product` and `CartItem` types, product data, and presentation components keep the UI consistent. Each implementation owns its own state and update logic.

- **Context + useReducer:** reducer handles actions; Context exposes state and dispatch to consumers.
- **Redux Toolkit:** a slice defines cart reducers/actions and a centralized store; `useSelector` subscribes to cart state.
- **Zustand:** a small store contains state and actions; components select the state they need directly.

## Comparison

| Area | Context + Reducer | Redux Toolkit | Zustand |
|---|---|---|---|
| Setup | Low | Medium | Very low |
| Boilerplate | Medium | Low/Medium | Low |
| Re-render control | Needs careful context design | Selector-based | Selector-based |
| Ecosystem | React built-in | Strong | Lightweight |
| Large-app fit | Depends on architecture | Strong for complex teams/apps | Good when requirements are simpler |

### Re-render observation

The demo includes a render counter. Context consumers can re-render when the provider value changes, while Redux Toolkit and Zustand allow more focused selector-based subscriptions. Exact behavior still depends on component boundaries and what each component subscribes to.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
