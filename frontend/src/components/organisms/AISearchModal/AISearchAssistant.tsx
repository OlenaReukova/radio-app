import { useState } from "react";
import { X, Sparkles, Mic, Send } from "lucide-react";
import { Button } from "../../atoms/Button";

interface AISearchAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABS = [
  "All",
  "Stations",
  "Artists",
  "DJs",
  "Genres",
  "Articles",
] as const;

type Tab = (typeof TABS)[number];

export function AISearchAssistant({ isOpen, onClose }: AISearchAssistantProps) {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl h-[85vh] rounded-3xl bg-gradient-to-br from-[#3A2A4F] to-[#24192F] border border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-lg">AI Search Assistant</h2>
              <p className="text-white/60 text-sm">Powered by advanced AI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
            aria-label="Close AI Search"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Context Tabs */}
        <div className="px-6 py-3 flex gap-2 border-b border-white/10 overflow-x-auto">
          {TABS.map((tab) => (
            <Button
              key={tab}
              variant="aiContext"
              onClick={() => setActiveTab(tab)}
              className={
                tab === activeTab
                  ? "bg-gradient-to-r from-[#E054FF] to-[#935CFF] text-white shadow-lg shadow-[#E054FF]/30"
                  : ""
              }
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white/80">
            Hi! I&apos;m your AI search assistant. Ask me anything about
            stations, genres, artists, or DJs.
          </div>

          {[
            "Show me popular electronic stations",
            "Find jazz music from France",
            "Recommend chill vibes for studying",
            "What's trending in rock music?",
          ].map((text) => (
            <button
              key={text}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5  text-white/80 text-sm transition-all border border-white/10 hover:bg-white/10 hover:border-[#E054FF]/50"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                placeholder="Ask me anything about music, stations, genres..."
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />
              <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>

            <button
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
