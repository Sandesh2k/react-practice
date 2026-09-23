import type { ChangeEvent } from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onToggle(todo.id, event.target.checked);
  };

  return (
    <li
      className={`todo-item ${
        todo.completed ? "completed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleChange}
        aria-label={`Mark "${todo.text}" as ${
          todo.completed ? "active" : "completed"
        }`}
      />

      <span>{todo.text}</span>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  );
}