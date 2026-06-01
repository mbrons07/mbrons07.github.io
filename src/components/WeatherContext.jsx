import { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [season, setSeason] = useState(() => {
    // Check local storage for preference
    const saved = localStorage.getItem("weatherSeason");
    if (saved !== null) {
      return saved; // 'winter', 'autumn', 'none'
    }
    return 'winter'; // Default to winter
  });

  useEffect(() => {
    localStorage.setItem("weatherSeason", season);
  }, [season]);

  const changeSeason = (newSeason) => {
    setSeason(newSeason);
  };

  return (
    <WeatherContext.Provider value={{ season, changeSeason }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
