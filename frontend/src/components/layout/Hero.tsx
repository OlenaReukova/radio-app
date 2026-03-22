import { Play, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartListening?: () => void;
  onExploreMoods?: () => void;
  totalStations?: number;
  totalGenres?: number;
}

export default function Hero({
  onStartListening,
  onExploreMoods,
  totalStations = 10000,
  totalGenres = 120,
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1F1529] via-[#2B2038] to-[#1F1529] mb-24">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {['10%', '30%', '50%', '70%', '90%'].map((left, i) => (
          <div
            key={i}
            className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent ${i % 2 === 0 ? 'via-purple-400' : 'via-pink-400'} to-transparent`}
            style={{ left }}
          />
        ))}
      </div>

      <div className="max-w-[1320px] mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-200">AI-Powered Discovery</span>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
            <span className="block font-thin text-white/90">Discover Radio</span>
            <span className="block gradient-text">from Around the World</span>
          </h1>

          <p className="text-lg md:text-xl text-purple-200/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stream thousands of radio stations from every corner of the globe.
            Discover new music, news, and culture with AI-powered recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button onClick={onStartListening} className="btn-premium group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Start Listening</span>
            </button>
            <button onClick={onExploreMoods} className="btn-outline-premium">
              <Sparkles className="w-5 h-5" />
              <span>Explore Moods</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl gradient-text mb-1">
                {totalStations.toLocaleString()}+
              </div>
              <div className="text-sm text-purple-300/60">Radio Stations</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl gradient-text mb-1">
                {totalGenres}+
              </div>
              <div className="text-sm text-purple-300/60">Genres</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl gradient-text mb-1">AI</div>
              <div className="text-sm text-purple-300/60">Powered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
