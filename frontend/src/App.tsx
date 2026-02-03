import { useEffect } from "react";
import Cookies from "js-cookie";
import Radio from "./Radio";
import Hero from "./Hero";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { CleanHeader } from "./components/organisms/Header/CleanHeader";
import { AccountMenu } from "./components/molecules/AccountMenu/AccountMenu";

function App() {
  useEffect(() => {
    Cookies.set("yourCookieName", "yourCookieValue", {
      sameSite: "none",
      secure: true,
    });

    Cookies.set("anotherCookie", "anotherValue", { sameSite: "strict" });

    Cookies.set("yetAnotherCookie", "yetAnotherValue", { sameSite: "lax" });
  }, []);

  const elena = {
    id: "1",
    name: "Elena",
    email: "elena@example.com",
  };

  return (
    <>
      <Toaster richColors />
      <div className="App pt-16">
        <CleanHeader />
        <h1>Radio Player</h1>
        <AccountMenu user={elena} />
        <Hero />
        <Radio />
        <Footer />
      </div>
    </>
  );
}

export default App;
