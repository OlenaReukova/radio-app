import { useEffect } from "react";
import Cookies from "js-cookie";
import Radio from "./Radio";
import Hero from "./Hero";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { CleanHeader } from "./components/organisms/Header/CleanHeader";

function App() {
  useEffect(() => {
    Cookies.set("yourCookieName", "yourCookieValue", {
      sameSite: "none",
      secure: true,
    });

    Cookies.set("anotherCookie", "anotherValue", { sameSite: "strict" });

    Cookies.set("yetAnotherCookie", "yetAnotherValue", { sameSite: "lax" });
  }, []);

  return (
    <>
      <Toaster richColors />
      <div className="App">
        <CleanHeader />
        <h1>Radio Player</h1>
        <Hero />
        <Radio />
        <Footer />
      </div>
    </>
  );
}

export default App;
