import { useEffect } from "react";
import Cookies from "js-cookie";
import Radio from "./Radio";
import Hero from "./Hero";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { CleanHeader } from "./components/organisms/Header/CleanHeader";
import { useState } from "react";
import { AISearchModal } from "./components/organisms/AISearchModal/AISearchModal";

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
  const [currentUser] = useState<null | {
    id: string;
    name: string;
    email: string;
  }>(null);

  return (
    <>
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
        <AISearchModal
          isOpen={isAISearchOpen}
          onClose={() => setIsAISearchOpen(false)}
          isSignedIn={Boolean(currentUser)}
        />
        <h1>Radio Player</h1>
        <Hero />
        <Radio />
        <Footer />
      </div>
    </>
  );
}

export default App;
