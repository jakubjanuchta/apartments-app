import styles from "@/styles/CityTile.module.scss";
import { CityTileProps } from "@/types/types";
import Image from "next/image";
import cities from "../../static/cities/cities";

export const CityTile = ({ name, link, slug }: CityTileProps) => {
  return (
    <a className={styles.card} href={link}>
      <Image
        src={cities[slug]}
        alt={`city: ${name}`}
        className={styles.image}
      />
      <div className={styles.cardOverlay}>
        <h2>{name}</h2>
      </div>
    </a>
  );
};
