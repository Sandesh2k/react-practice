import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { usePrevious } from "../hooks/usePrevious";
describe("usePrevious", () => {
  it("returns undefined first", () =>
    expect(renderHook(() => usePrevious(1)).result.current).toBeUndefined());
  it("returns previous value", () => {
    const { result, rerender } = renderHook(({ v }) => usePrevious(v), {
      initialProps: { v: 1 },
    });
    rerender({ v: 2 });
    expect(result.current).toBe(1);
    rerender({ v: 3 });
    expect(result.current).toBe(2);
  });
});
