import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { PlayerStation } from "./player.types";
import { useRadioPlayer } from "./useRadioPlayer";

const {
  mockHowlPlay,
  mockHowlStop,
  mockHowlUnload,
  mockHowlVolume,
  mockHowlOnce,
  mockHowlerStop,
  capturedConfig,
  MockHowl,
} = vi.hoisted(() => {
  const capturedConfig = { current: {} as Record<string, unknown> };

  const mockHowlPlay = vi.fn();
  const mockHowlStop = vi.fn();
  const mockHowlUnload = vi.fn();
  const mockHowlVolume = vi.fn();
  const mockHowlOnce = vi.fn();
  const mockHowlerStop = vi.fn();

  const MockHowl = vi
    .fn()
    .mockImplementation(function (config: Record<string, unknown>) {
      capturedConfig.current = config;
      return {
        play: mockHowlPlay,
        stop: mockHowlStop,
        unload: mockHowlUnload,
        volume: mockHowlVolume,
        once: mockHowlOnce,
      };
    });

  return {
    capturedConfig,
    mockHowlPlay,
    mockHowlStop,
    mockHowlUnload,
    mockHowlVolume,
    mockHowlOnce,
    mockHowlerStop,
    MockHowl,
  };
});

vi.mock("howler", () => ({
  Howl: MockHowl,
  Howler: { stop: mockHowlerStop },
}));

const stationA: PlayerStation = {
  stationuuid: "abc-123",
  name: "Test Radio",
  country: "Germany",
  favicon: "https://example.com/favicon.png",
  genres: ["jazz"],
  url_resolved: "https://stream.example.com/live",
};

const stationB: PlayerStation = {
  stationuuid: "xyz-789",
  name: "Another Radio",
  country: "France",
  genres: ["pop"],
  url_resolved: "https://stream.another.com/live",
};

function fireHowlCallback(name: string) {
  const cb = capturedConfig.current[name] as (() => void) | undefined;
  if (cb) act(() => cb());
}

describe("useRadioPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedConfig.current = {};
  });

  describe("initial state", () => {
    it("currentStation is null", () => {
      const { result } = renderHook(() => useRadioPlayer());
      expect(result.current.currentStation).toBeNull();
    });

    it("currentSrc is null (derived from null currentStation)", () => {
      const { result } = renderHook(() => useRadioPlayer());
      expect(result.current.currentSrc).toBeNull();
    });

    it("status is idle", () => {
      const { result } = renderHook(() => useRadioPlayer());
      expect(result.current.status).toBe("idle");
    });

    it("volume is 1", () => {
      const { result } = renderHook(() => useRadioPlayer());
      expect(result.current.volume).toBe(1);
    });
  });

  describe("currentSrc derivation", () => {
    it("equals currentStation.url_resolved while a station is loaded", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      expect(result.current.currentSrc).toBe(stationA.url_resolved);
    });

    it("returns null after stop()", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      act(() => result.current.stop());
      expect(result.current.currentSrc).toBeNull();
    });
  });

  describe("play(station)", () => {
    it("sets currentStation to the provided station", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      expect(result.current.currentStation).toEqual(stationA);
    });

    it("sets status to loading synchronously", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      expect(result.current.status).toBe("loading");
    });

    it("unloads the previous Howl instance before creating a new one", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      act(() => result.current.play(stationB));
      expect(mockHowlUnload).toHaveBeenCalledOnce();
    });

    it("creates a Howl instance using station.url_resolved as the src", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      expect(MockHowl).toHaveBeenCalledWith(
        expect.objectContaining({ src: [stationA.url_resolved] }),
      );
    });

    it("calls play() on the created Howl instance", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      expect(mockHowlPlay).toHaveBeenCalledOnce();
    });

    it("sets status to playing when the Howl onplay callback fires", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      fireHowlCallback("onplay");
      expect(result.current.status).toBe("playing");
    });

    it("sets status to idle when the Howl onend callback fires", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      fireHowlCallback("onend");
      expect(result.current.status).toBe("idle");
    });

    it("sets status to error after 5000ms debounce when onloaderror fires", () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      fireHowlCallback("onloaderror");
      expect(result.current.status).toBe("loading");
      act(() => vi.advanceTimersByTime(5000));
      expect(result.current.status).toBe("error");
      vi.useRealTimers();
    });

    it("does not set error if onplay fires within 5000ms of onloaderror", () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      fireHowlCallback("onloaderror");
      fireHowlCallback("onplay");
      act(() => vi.advanceTimersByTime(5000));
      expect(result.current.status).toBe("playing");
      vi.useRealTimers();
    });

    it("registers an unlock retry when onplayerror fires and does not set error", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      fireHowlCallback("onplayerror");
      expect(mockHowlOnce).toHaveBeenCalledWith("unlock", expect.any(Function));
      expect(result.current.status).toBe("loading");
    });
  });

  describe("stop()", () => {
    it("sets currentStation to null", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      act(() => result.current.stop());
      expect(result.current.currentStation).toBeNull();
    });

    it("sets currentSrc to null", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      act(() => result.current.stop());
      expect(result.current.currentSrc).toBeNull();
    });

    it("sets status to idle", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      act(() => result.current.stop());
      expect(result.current.status).toBe("idle");
    });

    it("calls stop() and unload() on the active Howl instance", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      act(() => result.current.stop());
      expect(mockHowlStop).toHaveBeenCalledOnce();
      expect(mockHowlUnload).toHaveBeenCalledOnce();
    });
  });

  describe("toggle(station)", () => {
    it("plays the station when nothing is currently active", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.toggle(stationA));
      expect(result.current.currentStation).toEqual(stationA);
    });

    it("stops playback when toggling the same station (matched by url_resolved)", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.toggle(stationA));
      act(() => result.current.toggle(stationA));
      expect(result.current.currentStation).toBeNull();
    });

    it("switches to the new station when a different station is toggled", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.toggle(stationA));
      act(() => result.current.toggle(stationB));
      expect(result.current.currentStation).toEqual(stationB);
    });

    it("treats stations with different url_resolved as distinct even if same name", () => {
      const clone = { ...stationA, url_resolved: "https://different.stream/live" };
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.toggle(stationA));
      act(() => result.current.toggle(clone));
      expect(result.current.currentStation).toEqual(clone);
    });
  });

  describe("setVolume(v)", () => {
    it("updates the volume state", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.setVolume(0.5));
      expect(result.current.volume).toBe(0.5);
    });

    it("calls volume() on the active Howl instance immediately", () => {
      const { result } = renderHook(() => useRadioPlayer());
      act(() => result.current.play(stationA));
      act(() => result.current.setVolume(0.3));
      expect(mockHowlVolume).toHaveBeenCalledWith(0.3);
    });

    it("does not throw when called with no active Howl instance", () => {
      const { result } = renderHook(() => useRadioPlayer());
      expect(() => act(() => result.current.setVolume(0.5))).not.toThrow();
    });
  });
});
