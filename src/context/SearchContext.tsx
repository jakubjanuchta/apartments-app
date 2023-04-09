import { createContext, PropsWithChildren, useState } from "react";
import { SearchContextData, SearchContextType } from "@/types/types";

export const SearchContext = createContext<SearchContextType>({
  searchData: null,
  setSearchData: () => {},
});

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [searchData, setSearchData] = useState<SearchContextData>(null);

  const value = {
    searchData,
    setSearchData,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
