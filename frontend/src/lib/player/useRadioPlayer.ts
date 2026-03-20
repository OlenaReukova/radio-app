import { useRef, useState, useCallback } from "react";
import { Howl, Howler } from "howler";
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
      Howler.stop();
      setStatus("loading");

      soundRef.current?.unload();

      soundRef.current = new Howl({
        src: [station.url_resolved],
        html5: true,
        volume,
        onplay: () => setStatus("playing"),
        onpause: () => setStatus("paused"),
        onend: () => setStatus("idle"),
        onloaderror: () => setStatus("error"),
        onplayerror: () => setStatus("error"),
      });

      soundRef.current.play();
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
