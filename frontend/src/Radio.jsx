import React, { useEffect, useState } from "react";

const Radio = () => {
  const [stations, setStations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("all");
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  const categories = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  useEffect(() => {
    if (view === "favourites") return;

    const fetchStations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://radio-app-server.vercel.app/api/radio?filter=${filter}`
        );
        const data = await response.json();
        setStations(data.slice(0, 40));
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [filter, view]);

  const toggleFavourite = (station) => {
    let updated;
    if (favourites.find((f) => f.stationuuid === station.stationuuid)) {
      updated = favourites.filter((f) => f.stationuuid !== station.stationuuid);
    } else {
      updated = [...favourites, station];
    }
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const displayedStations =
    view === "favourites" ? favourites : stations.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🎧 Radio Player</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setView("all")}
          style={{
            marginRight: "0.5rem",
            background: view === "all" ? "#8c52ff" : "#2e2e2e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
          }}
        >
          Все станции
        </button>
        <button
          onClick={() => setView("favourites")}
          style={{
            background: view === "favourites" ? "#8c52ff" : "#2e2e2e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
          }}
        >
          ⭐ Избранное
        </button>
      </div>

      {view === "all" && (
        <>
          <input
            type="text"
            placeholder="Поиск станции..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "1rem",
              width: "60%",
            }}
          />

          <div style={{ marginBottom: "1rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  margin: "0.2rem",
                  background: filter === cat ? "#8c52ff" : "#444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.4rem 0.8rem",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </>
      )}

      {loading ? (
        <p>Загрузка станций...</p>
      ) : displayedStations.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {displayedStations.map((station) => (
            <div
              key={station.stationuuid}
              style={{
                background: "#1f1f2e",
                padding: "1rem",
                borderRadius: "10px",
                color: "#fff",
              }}
            >
              <img
                src={station.favicon || "/default-radio.png"}
                alt={station.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <h3 style={{ marginTop: "0.5rem" }}>{station.name}</h3>
              <p style={{ opacity: 0.7 }}>{station.country}</p>

              <button
                onClick={() => toggleFavourite(station)}
                style={{
                  background: "none",
                  border: "1px solid #8c52ff",
                  color: favourites.find(
                    (f) => f.stationuuid === station.stationuuid
                  )
                    ? "#ff5a79"
                    : "#fff",
                  borderRadius: "5px",
                  padding: "0.3rem 0.7rem",
                  cursor: "pointer",
                  marginTop: "0.4rem",
                }}
              >
                {favourites.find((f) => f.stationuuid === station.stationuuid)
                  ? "Удалить"
                  : "В избранное"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Radio;
