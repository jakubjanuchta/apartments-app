import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import buttonStyles from "@/styles/Button.module.scss";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mieszkaniator</title>
        <meta
          name="description"
          content="Mieszkaniator - app for searching apartments and rooms with real prices."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h2>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(1500)
                  .typeString("Witaj <br/> w <br/> mieszkaniatorze!")
                  .start();
              }}
            />
          </h2>
          <div className={styles.houseWall}>
            <div className={styles.houseDoorOpening}></div>
            <div className={styles.houseDoor}></div>
            <Link
              className={`${styles.houseButton} ${buttonStyles.main}`}
              href="/search"
            >
              Wyszukaj
            </Link>
          </div>
          <div className={styles.houseRoof}>
            <div className={styles.houseChimney}></div>
          </div>
        </div>
        <svg
          className={styles.invisibleSvg}
          width="0"
          height="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </main>
    </>
  );
}
