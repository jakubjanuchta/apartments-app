import styles from "@/styles/ApartmentTile.module.scss";
import { Button } from "./Button";
import { ApartmentTileProps, SearchType } from "@/types/types";
import { BedIcon } from "static/svgIcons/BedIcon";
import { AreaIcon } from "static/svgIcons/AreaIcon";
import { useEffect, useState } from "react";
import { PersonIcon } from "static/svgIcons/PersonIcon";
import "react-multi-carousel/lib/styles.css";
import { ImageCarousel } from "./ImagesCarousel";

export const ApartmentTile = ({ data, type, isMock }: ApartmentTileProps) => {
  const [description, setDescription] = useState<string>("");
  const [mocked, setMocked] = useState<boolean>(true);

  const {
    total,
    link,
    area,
    room_type,
    district,
    rent,
    bills,
    images,
    source,
    indicators,
  } = data;

  useEffect(() => {
    const rentIncluded = rent,
      billsIncluded = bills;
    if (rentIncluded || billsIncluded) {
      setDescription(
        `w tym 
        ${rentIncluded ? `czynsz: ${rent} zł` : ""}
        ${rentIncluded && billsIncluded ? ", " : ""} 
        ${billsIncluded ? `opłaty: ${bills} zł` : ""}`
      );
    }
  }, [rent, bills, isMock]);

  useEffect(() => {
    if (!isMock && mocked) {
      setTimeout(() => {
        setMocked(false);
      }, 300);
    }
  }, [isMock, mocked]);

  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.card} ${mocked ? styles.cardNotLoaded : null}`}>
        <div className={styles.cardImagesWrapper}>
          {images && !isMock && (
            <ImageCarousel images={images.slice(0, 1)} source={source} />
          )}
        </div>
        <div className={styles.cardTitle}>
          <h4>{district}</h4>
          <h3>{total} zł</h3>
          <p>{description || "czynsz w cenie najmu"}</p>
          <br />
          <p>Dodatkowe opłaty: {indicators ? "tak" : "nie"}</p>
        </div>
        <div className={styles.cardIcons}>
          <div>
            {type === SearchType.Apartment ? <BedIcon /> : <PersonIcon />}
            <p>{room_type}</p>
          </div>
          {type === SearchType.Apartment && (
            <div>
              <AreaIcon />
              <p>
                {Math.floor(+area)}
                m²
              </p>
            </div>
          )}
        </div>
        <div className={styles.cardFooter}>
          <Button key={link} text={`Sprawdz na ${source}`} href={link} />
        </div>
      </div>
    </div>
  );
};
