import React, { useRef, useCallback } from "react";
import { Howl, Howler } from "howler";
import PropTypes from "prop-types";

type CustomAudioPlayerProps = {
  src: string;
  isActive: boolean;
  onPlay: (src: string | null) => void;
  onError?: () => void;
};

function CustomAudioPlayer({
  src,
  isActive,
  onPlay,
  onError,
}: CustomAudioPlayerProps): JSX.Element {
  const [volume, setVolume] = React.useState<number>(1);
  const soundRef = useRef<Howl | null>(null);

  const togglePlay = useCallback(() => {
    Howler.stop();

    if (isActive) {
      soundRef.current?.stop();
      soundRef.current?.unload();
      soundRef.current = null;
      onPlay(null);
      return;
    }

    try {
      if (!soundRef.current) {
        soundRef.current = new Howl({
          src: [src],
          html5: true,
          volume,
          format: ["mp3", "aac", "ogg"],
          onloaderror: () => {
            console.error("Error loading the stream:", src);
            onError?.();
          },
          onplayerror: () => {
            console.error("Error playing the stream:", src);
            onError?.();
          },
          onend: () => onPlay(null),
        });
      }

      soundRef.current.volume(volume);

      soundRef.current.play();
      onPlay(src);
    } catch (error) {
      console.error("Ошибка при создании Howl:", error);
      onError?.();
    }
  }, [src, volume, isActive, onPlay, onError]);

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    soundRef.current?.volume(newVol);
  }, []);

  return (
    <div
      className="player"
      style={{
        marginTop: "0.5rem",
        borderRadius: "10px",
        background: "#2a2344",
        padding: "0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <button
        onClick={togglePlay}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
        title={isActive ? "Пауза" : "Воспроизвести"}
      >
        {isActive ? "⏸" : "▶️"}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolume}
        style={{ width: "100px", accentColor: "#8c52ff" }}
      />
    </div>
  );
}

CustomAudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onPlay: PropTypes.func,
  onError: PropTypes.func,
};

export default React.memo(CustomAudioPlayer);
