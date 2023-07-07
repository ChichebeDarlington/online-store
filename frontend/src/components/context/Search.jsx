import { useState, useEffect, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keywords: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

export const useSearch = () => useContext(SearchContext);
