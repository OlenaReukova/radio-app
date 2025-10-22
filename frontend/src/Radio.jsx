import React, { useEffect, useState } from "react";
import "./Radio.css";
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaVolumeUp, FaSearch, FaStar } from "react-icons/fa";

const Radio = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [current, setCurrent] = useState(null);
  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [audio] = useState(new Audio());
  const [volume, setVolume] = useState(0.5);
  const [view, setView] = useState("all");
  const [country, setCountry] = useState("");

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
    const fetchStations = async () => {
      setLoading(true);
      try {
        const query = country ? `&country=${country}` : "";
        const res = await fetch(
          `https://radio-app-server.vercel.app/api/radio?filter=${filter}${query}`
        );
        const data = await res.json();
        setStations(data.slice(0, 30));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (view === "all") fetchStations();
  }, [filter, country, view]);

  const handlePlay = (station) => {
    if (current && current.stationuuid === station.stationuuid) {
      audio.pause();
      setCurrent(null);
      return;
    }
    audio.src = station.url_resolved;
    audio.volume = volume;
    audio.play();
    setCurrent(station);
  };

  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  const toggleFavourite = (station) => {
    let updated;
    if (favourites.find((fav) => fav.stationuuid === station.stationuuid)) {
      updated = favourites.filter((fav) => fav.stationuuid !== station.stationuuid);
    } else {
      updated = [...favourites, station];
    }
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const displayedStations = view === "favourites" ? favourites : stations;

  return (
    <div className="radio-container">
      <h1 className="title">🎧 Radio Player</h1>
      <div className="tabs">
        <button className={`tab-btn ${view === "all" ? "active" : ""}`} onClick={() => setView("all")}>
          All Stations
        </button>
        <button className={`tab-btn ${view === "favourites" ? "active" : ""}`} onClick={() => setView("favourites")}>
          ⭐ Favourites
        </button>
      </div>

      {view === "all" && (
        <>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by country..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </>
      )}

      {loading ? (
        <div className="loader">Loading stations...</div>
      ) : (
        <div className="stations-grid">
          {displayedStations.length === 0 ? (
            <p className="no-results">No stations found</p>
          ) : (
            displayedStations.map((station) => (
              <div key={station.stationuuid} className="station-card">
                <img
                  src={station.favicon || "/default-radio.png"}
                  alt={station.name}
                  className="station-img"
                />
                <div className="station-info">
                  <h3 className="station-name">{station.name}</h3>
                  <p className="station-country">{station.country}</p>
                </div>
                <div className="station-controls">
                  <button className="play-btn" onClick={() => handlePlay(station)}>
                    {current?.stationuuid === station.stationuuid ? <FaPause /> : <FaPlay />}
                  </button>
                  <FaVolumeUp className="volume-icon" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                  <button className="fav-btn" onClick={() => toggleFavourite(station)}>
                    {favourites.find((fav) => fav.stationuuid === station.stationuuid) ? (
                      <FaHeart color="#ff5a79" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Radio;
