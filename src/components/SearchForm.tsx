import {
  CITIES,
  CITY_DISTRICTS,
  ROOM_TYPES,
  APARTMENT_TYPES,
} from "@/constants/constants";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@/styles/Search.module.scss";
import { useContext } from "react";
import { DropDownSelect } from "@/components/DropDown";
import {
  DropDownOption,
  SearchData,
  SearchFormProps,
  SearchState,
  SearchType,
} from "@/types/types";
import { SearchContext } from "@/context/SearchContext";

const SearchForm = ({ type, setSearchState }: SearchFormProps) => {
  const { setSearchData } = useContext(SearchContext);

  const router = useRouter();
  const { city } = router.query;

  const currentCity = CITIES.find((singleCity) => singleCity.slug === city);

  const cityDistricts = CITY_DISTRICTS.find(
    (district) => district.slug === city
  );

  const districtOptions: DropDownOption[] = cityDistricts?.districts.map(
    (district, index) => ({
      value: index,
      label: district,
    })
  ) || [{ value: 0, label: "" }];

  const apartmentsOptions: DropDownOption[] = APARTMENT_TYPES.map(
    (apartmentType, index) => ({
      value: index,
      label: apartmentType,
    })
  );

  const roomsOptions: DropDownOption[] = ROOM_TYPES.map((roomType, index) => ({
    value: index,
    label: roomType,
  }));

  const searchSchema = yup.object().shape({
    min_price: yup
      .number()
      .label("Minimal Price")
      .required()
      .typeError("Cena minimalna powinna być liczbą")
      .min(0, "Cena minimalna powinna być większa lub równa 0")
      .default(0),
    max_price: yup
      .number()
      .label("Maximal Price")
      .typeError("Cena maksymalna powinna być liczbą")
      .min(
        yup.ref("min_price"),
        "Cena maksymalna nie może być mniejsza od minimalnej"
      )
      .required()
      .default(2000),
    area: yup
      .number()
      .label("Area")
      .required()
      .typeError("Powierzchnia powinna być liczbą")
      .min(0, "Powierzchnia powinna być większa lub równa 0")
      .default(30),
    types: yup
      .mixed()
      .typeError("Wybierz co najmniej jeden rodzaj")
      .required()
      .label("Selected Types"),
    districts: yup
      .mixed()
      .typeError("Wybierz co najmniej jedną dzielnicę")
      .required()
      .label("Selected Districts"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const onSubmit = async (data: SearchData) => {
    console.log(data);
    if (currentCity) {
      setSearchState(SearchState.InProgress);
      setSearchData({ ...data, city: currentCity });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>
        {type === SearchType.Apartment
          ? "Mieszkanie - "
          : type === SearchType.Room
          ? "Pokój - "
          : ""}
        {currentCity?.name}
      </h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit as any)}>
        <>
          <div className={styles.formGroup}>
            <>
              <label>Dzielnica</label>
              <Controller
                name="districts"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DropDownSelect
                    selectId="districts-select"
                    options={districtOptions}
                    value={value}
                    onChange={onChange}
                    selectAllLabel="Wszyskie"
                  />
                )}
              />
            </>
          </div>

          <div className={styles.formGroup}>
            <>
              <label>
                {type === SearchType.Apartment
                  ? "Rodzaj mieszkania"
                  : "Rodzaj pokoju"}
              </label>
              <Controller
                name="types"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DropDownSelect
                    selectId="types-select"
                    options={
                      type === SearchType.Apartment
                        ? apartmentsOptions
                        : roomsOptions
                    }
                    value={value}
                    onChange={onChange}
                    selectAllLabel="Wszystkie"
                  />
                )}
              />
            </>
          </div>

          <div className={`${styles.formGroup} ${styles.formGroupHalf}`}>
            <>
              <label>Minimalna cena</label>
              <input type="number" placeholder="0" {...register("min_price")} />
              <span>{errors.min_price?.message?.toString()}</span>
            </>
          </div>
          <div className={`${styles.formGroup} ${styles.formGroupHalf}`}>
            <>
              <label>Maksymalna cena</label>
              <input
                type="number"
                placeholder="2000"
                {...register("max_price")}
              />
              <span>{errors.max_price?.message?.toString()}</span>
            </>
          </div>

          {type === SearchType.Apartment && (
            <div className={styles.formGroup}>
              <>
                <label>
                  Minimalna powierzchnia <span>(m²)</span>
                </label>
                <input type="number" placeholder="30" {...register("area")} />
                <span>{errors.area?.message?.toString()}</span>
              </>
            </div>
          )}

          <button type="submit">Wyszukaj</button>
        </>
      </form>
    </div>
  );
};

export default SearchForm;
