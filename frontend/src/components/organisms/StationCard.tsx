import { Play, Pause } from "lucide-react";
import { cn } from "../ui/utils";
import { GenreTagGroup } from "../atoms/GenreTagGroup";
import { FavoriteButton } from "../atoms/FavoriteButton";
import { AddToQueueButton } from "../atoms/AddToQueueButton";
import { ShareButton } from "../atoms/ShareButton";

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
  onShare: () => void;
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
  onShare,
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
          <ShareButton onShare={onShare} />
        </div>
      </div>
    </div>
  );
}
