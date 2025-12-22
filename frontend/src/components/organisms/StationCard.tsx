import { Play, Pause } from "lucide-react";
import { cn } from "../ui/utils";
import { GenreTagGroup } from "../atoms/GenreTagGroup";
import { Share2 } from "lucide-react";
import { FavoriteButton } from "../atoms/FavoriteButton";
import { AddToQueueButton } from "../atoms/AddToQueueButton";

interface StationCardProps {
  name: string;
  country: string;
  image: string;
  genres: string[];
  playing?: boolean;
  onPlay?: () => void;
  onFavorite: () => void;
  onAddToQueue: () => void;
  favorite: boolean;
}

export function StationCard({
  name,
  country,
  image,
  genres,
  playing,
  onPlay,
  onFavorite,
  favorite,
  onAddToQueue,
}: StationCardProps) {
  return (
    <div className={cn("card-interactive group")}>
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />

        <button
          onClick={onPlay}
          aria-label={playing ? "Pause station" : "Play station"}
          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="btn-play">
            {playing ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 ml-0.5 fill-current" />
            )}
          </div>
        </button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white truncate">{name}</h3>
            <p className="text-sm text-purple-200/70">{country}</p>
          </div>
        </div>

        <GenreTagGroup genres={genres} />
        <div className="mt-4 grid grid-cols-3 gap-3">
          <FavoriteButton active={favorite} onToggle={onFavorite} />
          <AddToQueueButton onAddToQueue={onAddToQueue} />
          <button
            aria-label="Share station"
            className="flex items-center justify-center gap-2 px-3 py-2.5
               bg-white/5 border border-white/10 rounded-xl
               text-purple-200/70
               hover:bg-white/10 hover:border-purple-500/30
               transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
