import React, { useEffect, useState } from "react";
import "./Radio.css";
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaVolumeUp, FaSearch } from "react-icons/fa";

const Radio = () => {
  const [stations, setStations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [country, setCountry] = useState("");
  const [current, setCurrent] = useState(null);
  const [audio] = useState(new Audio());
  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [volume, setVolume] = useState(0.5);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("all");

  const categories = [
    "all",
    "pop",
    "rock",
    "dance",
    "jazz",
    "retro",
    "house",
    "country",
  ];

  useEffect(() => {
    if (view === "favourites") return;
    const fetchStations = async () => {
      setLoading(true);
      try {
        const query = country ? `&country=${country}` : "";
        const res = await fetch(
          `https://radio-app-server.vercel.app/api/radio?filter=${filter}${query}`
        );
        const data = await res.json();
        setStations(data.slice(0, 40));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, [filter, country, view]);

  const handlePlay = (station) => {
    if (current && current.stationuuid === station.stationuuid) {
      audio.pause();
      setCurrent(null);
      return;
    }
    audio.src = station.url_resolved;
    audio.play();
    setCurrent(station);
  };

  const toggleFavourite = (station) => {
    const exists = favourites.find((s) => s.stationuuid === station.stationuuid);
    const updated = exists
      ? favourites.filter((s) => s.stationuuid !== station.stationuuid)
      : [...favourites, station];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  const displayed = view === "favourites" ? favourites : stations;

  return (
    <div className="radio-wrapper">
      <header className="header">
        <h1 className="brand">RadioSphere</h1>
        <div className="search-section">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by country..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
      </header>

      <nav className="nav">
        <div className="filter-tabs">
          <button
            className={view === "all" ? "tab active" : "tab"}
            onClick={() => setView("all")}
          >
            Discover
          </button>
          <button
            className={view === "favourites" ? "tab active" : "tab"}
            onClick={() => setView("favourites")}
          >
            ❤️ Favourites
          </button>
        </div>

        {view === "all" && (
          <div className="filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </nav>

      {loading ? (
        <div className="loading">Loading stations...</div>
      ) : displayed.length === 0 ? (
        <p className="no-data">No stations found</p>
      ) : (
        <div className="grid">
          {displayed.map((station) => (
            <div
              key={station.stationuuid}
              className={`card ${
                current?.stationuuid === station.stationuuid ? "playing" : ""
              }`}
            >
              <img
                src={station.favicon || "/default-radio.png"}
                alt={station.name}
                className="cover"
              />
              <div className="info">
                <h3>{station.name}</h3>
                <p>{station.country}</p>
              </div>
              <div className="controls">
                <button onClick={() => handlePlay(station)}>
                  {current?.stationuuid === station.stationuuid ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </button>
                <button onClick={() => toggleFavourite(station)}>
                  {favourites.find((f) => f.stationuuid === station.stationuuid) ? (
                    <FaHeart color="#ff6781" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </footer>
    </div>
  );
};

export default Radio;
