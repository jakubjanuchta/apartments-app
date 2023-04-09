import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { ApartmentTile } from "@/components/ApratmentTile";
import styles from "@/styles/Search.module.scss";
import { ApartmentData, City, SearchType, SourceType } from "@/types/types";
import {
  APARTMENT_TYPES,
  CITY_DISTRICTS,
  ROOM_TYPES,
} from "@/constants/constants";
import axios from "axios";

const Apartments = ({ router }: any) => {
  const [apartmentsData, setApartmentsData] = useState<ApartmentData[]>();
  const [type, setType] = useState<SearchType>(SearchType.Apartment);
  const { push, query } = router;

  useEffect(() => {
    const searchData = query;

    if (Object.keys(searchData).length) {
      const {
        area = 0,
        districts,
        min_price = 0,
        max_price = 2500,
        types,
        city,
      } = searchData;
      const districtsList = CITY_DISTRICTS.find(
        (cityItem) => cityItem.slug === city
      )?.districts;
      const our_districts =
        districtsList &&
        [...districts].map((districtID: string) => districtsList[+districtID]);

      const typesList =
        type === SearchType.Apartment ? APARTMENT_TYPES : ROOM_TYPES;

      const rooms =
        types && [...types].map((typeID: string) => typesList[+typeID]);

      const data = {
        area,
        city,
        max_price,
        min_price,
        our_districts,
        rooms,
      };
      console.log("search data", data);
      if (data) {
        axios
          .post(
            type === SearchType.Apartment
              ? "https://mieszkaniator.pythonanywhere.com/run_all_apartments"
              : "https://mieszkaniator.pythonanywhere.com/run_all_rooms",
            { ...data }
          )
          .then(({ data }) => {
            console.log("axios response: ", data);
            setApartmentsData(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [query, type]);

  const buttonHandler = () =>
    push({ query: { ...query, newParam: "someValue" } }, undefined, {
      shallow: true,
    });

  const mockData: ApartmentData = {
    ID: 0,
    area: "30",
    district: "district",
    link: "link",
    room_type: "type",
    price: 200,
    rent: 200,
    bills: 300,
    total: 500,
    images: ["image"],
    source: SourceType.Olx,
    indicators: 0,
  };

  const mockElements = Array.from({ length: 8 }, (value, index) => {
    return (
      <ApartmentTile key={index} data={mockData} type={type} isMock={true} />
    );
  });

  const elements = apartmentsData?.map((el) => {
    return <ApartmentTile key={el.ID} data={el} type={type} isMock={false} />;
  });

  return (
    <div className={styles.cardContainer}>
      {/* <button onClick={buttonHandler}>HANDLE</button> */}

      {apartmentsData ? elements : mockElements}
    </div>
  );
};

export default withRouter(Apartments);
