// Author: Nguyen Bao Anh
import { useEffect, useState } from "react";
import { getWeatherByCity, getForecast } from "./api/weather";
import SearchSuggest from "./components/SearchSuggest";
import Loading from "./components/Loading";

export default function App() {
  const [city, setCity] = useState("Hanoi");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const loadData = async (name) => {
    try {
      setLoading(true);

      const w = await getWeatherByCity(name);
      setWeather(w.data);

      const f = await getForecast(name);
      setForecast(f.data.list.slice(0, 5));

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Không tìm thấy thành phố!");
    }
  };

  useEffect(() => {
    loadData(city);
  }, []);

  const handleSearch = () => {
    if (!query) return;
    setCity(query);
    loadData(query);
  };

  return (
    <div
      className="
        w-full max-w-sm mx-auto min-h-screen p-4
        bg-gradient-to-br 
        from-blue-200 via-blue-100 to-white
        dark:from-[#0a0f2d] dark:via-[#0c143d] dark:to-[#111b4d]
        text-gray-900 dark:text-gray-50
        transition-all duration-500
      "
    >

      {/* Toggle Dark Mode */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setDark(!dark)}
          className="
            px-3 py-1 text-sm rounded-lg 
            bg-white/70 dark:bg-white/10 
            text-black dark:text-white 
            border border-black/20 dark:border-white/20
            shadow-sm
          "
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Search box */}
      <div className="relative mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập thành phố..."
          className="
            w-full px-4 py-3 rounded-xl 
            bg-white/90 dark:bg-white/15 
            text-black dark:text-white
            placeholder-gray-500 dark:placeholder-gray-300
            border border-gray-400 dark:border-white/25
            focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
            transition-all
          "
        />

        <SearchSuggest
          query={query}
          setQuery={setQuery}
          onSelect={(name) => setQuery(name)}
        />

        <button
          onClick={handleSearch}
          className="
            mt-3 w-full py-3 rounded-xl 
            bg-blue-600 hover:bg-blue-700 
            text-white font-semibold
            transition-all
          "
        >
          Tìm kiếm
        </button>
      </div>

      {loading && <Loading />}

      {weather && (
        <div
          className="
            bg-white/50 dark:bg-white/15 
            rounded-2xl p-6 mb-6 
            border border-black/10 dark:border-white/20
            shadow-xl
          "
        >
          <h1 className="text-xl font-bold mb-1">{weather.name}</h1>
          <p className="text-6xl font-semibold leading-none">
            {Math.round(weather.main.temp)}°
          </p>
          <p className="capitalize mt-2 text-lg opacity-90">
            {weather.weather[0].description}
          </p>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-2">Dự báo trong vài giờ</h2>

      <div className="space-y-3">
        {forecast.map((f, i) => (
          <div
            key={i}
            className="
              bg-white/50 dark:bg-white/15 
              p-4 rounded-xl 
              flex justify-between items-center
              border border-black/10 dark:border-white/20
            "
          >
            <span className="font-medium opacity-80">
              {f.dt_txt.split(" ")[1]}
            </span>
            <span className="font-semibold text-lg">{Math.round(f.main.temp)}°</span>
            <span className="opacity-80">{f.weather[0].main}</span>
          </div>
        ))}
      </div>
    </div>
  );

}
