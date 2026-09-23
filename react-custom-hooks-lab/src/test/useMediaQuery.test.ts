import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMediaQuery } from "../hooks/useMediaQuery";
describe("useMediaQuery", () => {
  let listener: ((e: MediaQueryListEvent) => void) | undefined;
  beforeEach(() => {
    listener = undefined;
    vi.stubGlobal(
      "matchMedia",
      vi.fn((q: string) => ({
        matches: q.includes("800px"),
        media: q,
        onchange: null,
        addEventListener: (_t: string, l: (e: MediaQueryListEvent) => void) => {
          listener = l;
        },
        removeEventListener: vi.fn(),
      })),
    );
  });
  it("returns match", () =>
    expect(
      renderHook(() => useMediaQuery("(min-width:800px)")).result.current,
    ).toBe(true));
  it("responds to change", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width:800px)"));
    act(() => listener?.({ matches: false } as MediaQueryListEvent));
    expect(result.current).toBe(false);
  });
});
