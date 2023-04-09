import Head from "next/head";
import { CITIES, STEPS_APARTMENTS } from "@/constants/constants";
import { StepIndication } from "@/components/StepIndication";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import { CityTile } from "@/components/CityTile";
import styles from "@/styles/Search.module.scss";

const Search = () => {
  const buttons = CITIES.map(({ name, slug }) => {
    return (
      <CityTile key={slug} name={name} slug={slug} link={`search/${slug}`} />
    );
  });

  return (
    <>
      <Head>
        <title>Mieszkaniator</title>
        <meta
          name="description"
          content="Application for seaching apartments and rooms with real prices."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StepIndication activeElements={1} stepsNames={STEPS_APARTMENTS} />
        <div className={styles.cityTiles}>{buttons}</div>
      </main>
    </>
  );
};

export default Search;
