interface GenreTagGroupProps {
  genres: string[];
}

export function GenreTagGroup({ genres }: GenreTagGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span key={genre} className="tag-genre">
          {genre}
        </span>
      ))}
    </div>
  );
}
