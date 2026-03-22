import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import StationGrid from "@/features/stations/StationGrid";
import { Toaster } from "sonner";
import { CleanHeader } from "@/features/navigation/CleanHeader";
import { TooltipProvider } from "@/components/shared/Tooltip";
import { AISearchAssistant } from "@/features/search/AISearchAssistant";

function App() {
  useEffect(() => {
    Cookies.set("yourCookieName", "yourCookieValue", {
      sameSite: "none",
      secure: true,
    });

    Cookies.set("anotherCookie", "anotherValue", { sameSite: "strict" });
    Cookies.set("yetAnotherCookie", "yetAnotherValue", { sameSite: "lax" });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Toaster richColors />

      <div className="App pt-16">
        <CleanHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleFilters={() => setFiltersOpen((v) => !v)}
          isFiltersOpen={filtersOpen}
          currentUser={null}
          onSignIn={() => console.log("Sign In")}
          onSignUp={() => console.log("Sign Up")}
          onOpenAISearch={() => setIsAISearchOpen(true)}
        />

        <AISearchAssistant
          isOpen={isAISearchOpen}
          onClose={() => setIsAISearchOpen(false)}
        />

        <Hero
          onStartListening={() => document.getElementById('station-grid')?.scrollIntoView({ behavior: 'smooth' })}
          onExploreMoods={() => setIsAISearchOpen(true)}
        />
        <div id="station-grid">
          <StationGrid />
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
