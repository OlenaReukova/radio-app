import { useRef, useState, useCallback } from "react";
import { Howl } from "howler";
import { PlayerStatus, PlayerStation } from "./radioPlayer.types";

export function useRadioPlayer() {
  const soundRef = useRef<Howl | null>(null);

  const [currentStation, setCurrentStation] = useState<PlayerStation | null>(
    null,
  );
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [volume, setVolumeState] = useState(1);

  const currentSrc = currentStation?.url_resolved ?? null;

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    soundRef.current?.volume(v);
  }, []);

  const play = useCallback(
    (station: PlayerStation) => {
      setStatus("loading");

      const oldHowl = soundRef.current;
      soundRef.current = null;
      oldHowl?.unload();

      let loadErrorTimeout: ReturnType<typeof setTimeout> | null = null;

      const howl = new Howl({
        src: [station.url_resolved],
        html5: true,
        volume,
        onplay: () => {
          if (soundRef.current !== howl) return;
          if (loadErrorTimeout) clearTimeout(loadErrorTimeout);
          setStatus("playing");
        },
        onpause: () => { if (soundRef.current === howl) setStatus("paused"); },
        onend: () => { if (soundRef.current === howl) setStatus("idle"); },
        onloaderror: () => {
          if (soundRef.current !== howl) return;
          loadErrorTimeout = setTimeout(() => {
            if (soundRef.current === howl) setStatus("error");
          }, 5000);
        },
        onplayerror: () => {
          if (soundRef.current !== howl) return;
          howl.once("unlock", () => {
            if (soundRef.current === howl) howl.play();
          });
        },
      });

      soundRef.current = howl;
      howl.play();
      setCurrentStation(station);
    },
    [volume],
  );

  const stop = useCallback(() => {
    soundRef.current?.stop();
    soundRef.current?.unload();
    soundRef.current = null;
    setCurrentStation(null);
    setStatus("idle");
  }, []);

  const toggle = useCallback(
    (station: PlayerStation) => {
      if (currentStation?.url_resolved === station.url_resolved) {
        stop();
      } else {
        play(station);
      }
    },
    [currentStation, play, stop],
  );

  return {
    currentStation,
    currentSrc,
    status,
    volume,
    setVolume,
    play,
    stop,
    toggle,
  };
}
