import styles from "@/styles/Search.module.scss";
import buttonStyles from "@/styles/Button.module.scss";
import { SearchState, SearchType, SearchTypeFormProps } from "@/types/types";

export const SearchTypeForm = ({
  setSearchType,
  setSearchState,
}: SearchTypeFormProps) => {
  const handleButton = (searchType: SearchType) => {
    setSearchType(searchType);
    setSearchState(SearchState.Details);
  };
  return (
    <div className={styles.searchTypeContainer}>
      <h2>Wybierz czego szukasz</h2>
      <div className={styles.buttonsContainer}>
        <button
          className={buttonStyles.main}
          onClick={() => handleButton(SearchType.Apartment)}
        >
          Mieszkanie
        </button>
        <button
          className={buttonStyles.main}
          onClick={() => handleButton(SearchType.Room)}
        >
          Pokój
        </button>
      </div>
    </div>
  );
};
