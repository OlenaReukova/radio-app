import { Button } from "../ui/button";

interface GenreTagGroupProps {
  genres: string[];
}

export function GenreTagGroup({ genres }: GenreTagGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <Button key={genre} variant="glass" size="xs" className="tag-genre">
          {genre}
        </Button>
      ))}
    </div>
  );
}
