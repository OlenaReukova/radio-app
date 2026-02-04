import { useState, useEffect } from "react";
import { X, Mic, Send, Sparkles, Search } from "lucide-react";
import { Button } from "../../atoms/Button";

type RadioStation = {
  stationuuid: string;
  name: string;
  country: string;
  favicon?: string;
  url_resolved: string;
};

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  stations: RadioStation[];
}

const exampleQueries = [
  "Find upbeat latino stations",
  "Play relaxing jazz music",
  "Show me stations for working out",
  "Discover romantic French music",
  "Find energetic rock stations",
];

export function AISearchModal({
  isOpen,
  onClose,
  onSearch,
  stations,
}: AISearchModalProps) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen || query.length < 3) {
      setSuggestions([]);
      return;
    }

    const countries = Array.from(new Set(stations.map((s) => s.country)));

    setSuggestions(
      countries
        .filter((c) => c.toLowerCase().includes(query.toLowerCase()))
        .map((c) => `Discover ${c} radio`)
        .slice(0, 5),
    );
  }, [query, stations, isOpen]);

  if (!isOpen) return null;

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#1F1529] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-lg font-semibold">AI Search Assistant</h2>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              aria-label="Close AI Search"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-white/90">
            Ask me anything about radio stations, genres, or moods
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search input */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Try: 'Find upbeat latino stations'"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                autoFocus
              />
            </div>

            {/* Voice button (UI only for now) */}
            <button
              onClick={() => setIsListening((v) => !v)}
              className={`p-3 rounded-xl transition-all ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
              aria-label="Voice search"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Send */}
            <button
              onClick={handleSearch}
              className="px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              aria-label="Search"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-white/60 mb-2">Suggestions:</p>
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(s);
                      onSearch(s);
                      onClose();
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-purple-500/20 text-white/80 transition-colors"
                  >
                    <Sparkles className="inline w-4 h-4 mr-2 text-purple-400" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Example queries */}
          {!query && suggestions.length === 0 && (
            <div>
              <p className="text-sm text-white/60 mb-3">Try these examples:</p>
              <div className="space-y-2">
                {exampleQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
