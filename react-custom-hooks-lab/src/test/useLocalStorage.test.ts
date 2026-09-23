import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "../hooks/useLocalStorage";
describe("useLocalStorage", () => {
  beforeEach(() => localStorage.clear());
  it("reads initial value", () =>
    expect(renderHook(() => useLocalStorage("x", 1)).result.current[0]).toBe(
      1,
    ));
  it("reads stored value", () => {
    localStorage.setItem("x", "2");
    expect(renderHook(() => useLocalStorage("x", 1)).result.current[0]).toBe(2);
  });
  it("persists updates", () => {
    const { result } = renderHook(() => useLocalStorage("x", 1));
    act(() => result.current[1](3));
    expect(localStorage.getItem("x")).toBe("3");
  });
  it("handles invalid JSON", () => {
    localStorage.setItem("x", "bad");
    expect(renderHook(() => useLocalStorage("x", 1)).result.current[0]).toBe(1);
  });
});
