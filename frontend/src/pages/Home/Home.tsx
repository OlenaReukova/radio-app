import { useOutletContext } from "react-router-dom";
import StationGrid from "@/features/stations/StationGrid";
import Hero from "@/components/layout/Hero";

export function Home() {
  const context = useOutletContext<{ onOpenAISearch?: () => void }>();

  return (
    <>
      <Hero
        onStartListening={() =>
          document.getElementById("station-grid")?.scrollIntoView({ behavior: "smooth" })
        }
        onExploreMoods={context?.onOpenAISearch}
      />
      <div id="station-grid">
        <StationGrid />
      </div>
    </>
  );
}
