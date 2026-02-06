//hook
import { useRef, useState, useCallback } from "react";
import { Howl, Howler } from "howler";
import { PlayerStatus } from "./radioPlayer.types";

export function useRadioPlayer() {
  //useRef is used for outside things(sound, timer, socket)
  const soundRef = useRef<Howl | null>(null);

  //what station is playing, what state is, and what volume is
  //states for UI
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [volume, setVolume] = useState(1);

  const play = useCallback(
    (src: string) => {
      Howler.stop();
      setStatus("loading");

      soundRef.current?.unload();

      soundRef.current = new Howl({
        src: [src],
        html5: true,
        volume,
        onplay: () => setStatus("playing"),
        onpause: () => setStatus("paused"),
        onend: () => setStatus("idle"),
        onloaderror: () => setStatus("error"),
        onplayerror: () => setStatus("error"),
      });

      soundRef.current.play();
      setCurrentSrc(src);
    },
    [volume],
  );

  const stop = useCallback(() => {
    soundRef.current?.stop();
    soundRef.current?.unload();
    soundRef.current = null;
    setCurrentSrc(null);
    setStatus("idle");
  }, []);

  const toggle = useCallback(
    (src: string) => {
      if (currentSrc === src) {
        stop();
      } else {
        play(src);
      }
    },
    [currentSrc, play, stop],
  );

  return {
    currentSrc,
    status,
    volume,
    setVolume,
    play,
    stop,
    toggle,
  };
}
