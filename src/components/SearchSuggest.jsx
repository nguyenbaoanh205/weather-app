import { useEffect, useState } from "react";

export default function SearchSuggest({ query, setQuery, onSelect }) {
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggest([]);
      return;
    }

    const fetchData = async () => {
      const res = await fetch(
        `https://api.teleport.org/api/cities/?search=${query}`
      );
      const data = await res.json();
      const list = data._embedded["city:search-results"].slice(0, 6);
      setSuggest(list);
    };

    fetchData();
  }, [query]);

  return (
    <div className="absolute bg-white dark:bg-gray-800 w-full rounded-lg shadow mt-1 z-20">
      {suggest.map((item) => (
        <div
          key={item.matching_full_name}
          onClick={() => {
            onSelect(item.matching_full_name);
            setSuggest([]);
          }}
          className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          {item.matching_full_name}
        </div>
      ))}
    </div>
  );
}
