import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { FilterTabs } from "./components/FilterTabs";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";

import { useLocalStorage } from "./hooks/useLocalStorage";

import type { Filter, Todo } from "./types";

const STORAGE_KEY = "todos";

function getFilter(pathname: string): Filter {
  if (pathname === "/active") {
    return "active";
  }

  if (pathname === "/completed") {
    return "completed";
  }

  return "all";
}

export default function App() {
  const { pathname } = useLocation();

  const filter = getFilter(pathname);

  const [todos, setTodos] =
    useLocalStorage<Todo[]>(
      STORAGE_KEY,
      []
    );

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter(
        (todo) => !todo.completed
      );
    }

    if (filter === "completed") {
      return todos.filter(
        (todo) => todo.completed
      );
    }

    return todos;
  }, [filter, todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((currentTodos) => [
      ...currentTodos,
      newTodo,
    ]);
  };

  const toggleTodo = (
    id: string,
    completed: boolean
  ) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.filter(
        (todo) => todo.id !== id
      )
    );
  };

  return (
    <main className="app">
      <h1>Todo App</h1>

      <TodoForm onAdd={addTodo} />

      <FilterTabs />

      <section aria-live="polite">
        {filteredTodos.length === 0 ? (
          <p className="empty-state">
            {filter === "all"
              ? "No todos yet."
              : `No ${filter} todos.`}
          </p>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </section>

      <p className="count">
        {
          todos.filter(
            (todo) => !todo.completed
          ).length
        }{" "}
        active{" "}
        {todos.length === 1
          ? "todo"
          : "todos"}
      </p>
    </main>
  );
}