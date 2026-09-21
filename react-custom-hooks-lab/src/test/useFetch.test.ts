import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useFetch } from "../hooks/useFetch";
describe("useFetch", () => {
  afterEach(() => vi.restoreAllMocks());
  it("loads data", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: 1 }), { status: 200 }),
    );
    const { result } = renderHook(() => useFetch<{ id: number }>("/api"));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.data).toEqual({ id: 1 }));
    expect(result.current.error).toBeNull();
  });
  it("handles HTTP error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 500 }),
    );
    const { result } = renderHook(() => useFetch("/api"));
    await waitFor(() => expect(result.current.error?.message).toBe("HTTP 500"));
  });
  it("handles network error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => useFetch("/api"));
    await waitFor(() => expect(result.current.error?.message).toBe("offline"));
  });
  it("aborts on unmount", () => {
    const abort = vi.spyOn(AbortController.prototype, "abort");
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_i, init) =>
        new Promise((_r, reject) =>
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          ),
        ),
    );
    const { unmount } = renderHook(() => useFetch("/slow"));
    unmount();
    expect(abort).toHaveBeenCalled();
  });
});
