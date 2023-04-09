import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/ApartmentTile.module.scss";
import { ArrowLeft } from "static/svgIcons/ArrowLeft";
import { ArrowRight } from "static/svgIcons/ArrowRight";
import { SourceType } from "@/types/types";

export const ImageCarousel = ({
  images,
  source,
}: {
  images: string[];
  source: SourceType;
}) => {
  const responsive = {
    all_devices: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const fallbackImage =
    source === SourceType.Olx
      ? "https://www.proto.pl/sites/default/files/styles/zdjecie_glowne_artykulu/public/informacje/obrazy/logo-olx-nowe.png?itok=iy5-__FE"
      : "https://www.proto.pl/sites/default/files/informacje/obrazy/otodom-logo-nowe.png";

  const imagesComponents = images.map((image) => {
    let src = image ? image + `?_=${Date.now()}` : fallbackImage;

    return (
      <Image
        key={src}
        onError={() => (src = fallbackImage)}
        src={src}
        className={styles.cardImage}
        alt="src"
        width="200"
        height="100"
      />
    );
  });

  const CustomRight = ({ onClick }: any) => (
    <span className={styles.arrowRight} onClick={onClick}>
      <ArrowRight />
    </span>
  );
  const CustomLeft = ({ onClick }: any) => (
    <span className={styles.arrowLeft} onClick={onClick}>
      <ArrowLeft />
    </span>
  );

  return (
    <Carousel
      responsive={responsive}
      arrows={images.length > 1}
      swipeable
      draggable
      showDots={images.length > 1}
      ssr={false}
      additionalTransfrom={0}
      infinite
      autoPlay={false}
      keyBoardControl={false}
      renderDotsOutside={false}
      transitionDuration={500}
      containerClass={styles.cardCarousel}
      dotListClass={styles.cardDots}
      customRightArrow={<CustomRight />}
      customLeftArrow={<CustomLeft />}
    >
      {imagesComponents}
    </Carousel>
  );
};
