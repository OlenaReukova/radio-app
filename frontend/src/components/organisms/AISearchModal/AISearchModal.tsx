import { Sparkles, X } from "lucide-react";
import { Button } from "../../atoms/Button";

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean;
}

export function AISearchModal({
  isOpen,
  onClose,
  isSignedIn,
}: AISearchModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl rounded-xl bg-[#1F1529] border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-purple-300">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-semibold">AI Search Assistant</h2>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close AI Search"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-white/70 mb-4">
          Ask questions like a human. Find stations, genres, or moods.
        </p>

        <div className="rounded-lg border border-white/10 p-4 text-sm text-white/60">
          {isSignedIn ? (
            <>
              Enhanced AI results enabled.
              <br />
              We will use your preferences and history soon.
            </>
          ) : (
            <>
              Basic AI search is available.
              <br />
              Sign in for smarter, personalised results.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
