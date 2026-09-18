import { useRef } from "react";
export function RenderBadge({ name }: { name: string }) {
  const n = useRef(0);
  n.current++;
  return (
    <span className="badge">
      {name} renders: {n.current}
    </span>
  );
}
