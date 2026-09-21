import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
describe("useOnClickOutside", () => {
  it("calls handler outside", () => {
    const h = vi.fn(),
      el = document.createElement("div");
    document.body.append(el);
    renderHook(() => {
      const r = useRef<HTMLDivElement | null>(el);
      useOnClickOutside(r, h);
    });
    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(h).toHaveBeenCalled();
    el.remove();
  });
  it("ignores inside", () => {
    const h = vi.fn(),
      el = document.createElement("div"),
      child = document.createElement("button");
    el.append(child);
    document.body.append(el);
    renderHook(() => {
      const r = useRef<HTMLDivElement | null>(el);
      useOnClickOutside(r, h);
    });
    child.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(h).not.toHaveBeenCalled();
    el.remove();
  });
});
