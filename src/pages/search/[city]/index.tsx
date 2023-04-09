import { CITIES, STEPS_APARTMENTS } from "@/constants/constants";
import Router, { useRouter } from "next/router";
import styles from "@/styles/Search.module.scss";
import { useContext, useEffect, useState } from "react";
import { StepIndication } from "@/components/StepIndication";
import { SearchState, SearchType } from "@/types/types";
import SearchForm from "@/components/SearchForm";
import { SearchTypeForm } from "@/components/SearchTypeForm";
import { SearchContext } from "@/context/SearchContext";

const SearchByCity = () => {
  const [searchState, setSearchState] = useState<SearchState>(SearchState.Type);
  const [searchType, setSearchType] = useState<SearchType | null>(null);
  const [isReadyToDisplay, setIsReadyToDisplay] = useState<boolean>(false);
  const [searchComponent, setSearchComponent] = useState<JSX.Element | null>(
    null
  );

  const { searchData } = useContext(SearchContext);

  const router = useRouter();
  const { city } = router.query;

  useEffect(() => {
    if (city && !CITIES.find(({ slug }) => slug === city)) {
      Router.push("/search");
    } else if (city) {
      setIsReadyToDisplay(true);
    }
  }, [city]);

  useEffect(() => {
    setSearchComponent(() => {
      switch (searchState) {
        case SearchState.Details:
          return (
            searchType && (
              <SearchForm type={searchType} setSearchState={setSearchState} />
            )
          );
        case SearchState.InProgress:
          if (searchData) {
            const { area, districts, min_price, max_price, types } = searchData,
              districtsParam = districts
                .map((district) => `districts=${district.value}`)
                .join("&"),
              typesParam = types.map((type) => `types=${type.value}`).join("&");

            Router.push(
              `${city}/${searchType}?${districtsParam}&${typesParam}${
                searchType === SearchType.Apartment ? "&area=" + area : ""
              }&min_price=${min_price}&max_price=${max_price}`
            );
          }
          return null;
        case SearchState.Type:
        default:
          return (
            <SearchTypeForm
              setSearchType={setSearchType}
              setSearchState={setSearchState}
            />
          );
      }
    });
  }, [searchState, searchType, city, searchData]);

  return (
    <div className={styles.page}>
      {isReadyToDisplay && (
        <>
          <StepIndication activeElements={2} stepsNames={STEPS_APARTMENTS} />
          <div className={styles.searchContainer}>{searchComponent}</div>
        </>
      )}
    </div>
  );
};

export default SearchByCity;
