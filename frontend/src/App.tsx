import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Radio from "./Radio";
import Hero from "./Hero";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { CleanHeader } from "./components/organisms/Header/CleanHeader";
import { TooltipProvider } from "./components/atoms/Tooltip/tooltip";
import { AISearchAssistant } from "./components/organisms/AISearchModal/AISearchAssistant";

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

        <h1>Radio Player</h1>
        <Hero />
        <Radio />
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
