import { City, CityDistricts } from "@/types/types";

export const APARTMENT_TYPES: string[] = [
  "Kawalerka",
  "2 pokoje",
  "3 pokoje",
  "4 i więcej",
];

export const ROOM_TYPES: string[] = [
  "Jednoosobowy",
  "Dwuosobowy",
  "Trzyosobowy i więcej",
];

export const CITIES: City[] = [
  {
    name: "Kraków",
    slug: "krakow",
  },
  {
    name: "Warszawa",
    slug: "warszawa",
  },
  {
    name: "Wrocław",
    slug: "wroclaw",
  },
  {
    name: "Poznań",
    slug: "poznan",
  },
];

export const CITY_DISTRICTS: CityDistricts[] = [
  {
    slug: "krakow",
    districts: [
      "Bieńczyce",
      "Bieżanów-Prokocim",
      "Bronowice",
      "Czyżyny",
      "Dębniki",
      "Grzegórzki",
      "Krowodrza",
      "Łagiewniki-Borek Fałęcki",
      "Mistrzejowice",
      "Nowa Huta",
      "Podgórze",
      "Podgórze Duchackie",
      "Prądnik Biały",
      "Prądnik Czerwony",
      "Stare Miasto",
      "Swoszowice",
      "Wzgórza Krzesławickie",
      "Zwierzyniec",
    ],
  },
  {
    slug: "warszawa",
    districts: ["Śródmieście", "Mokotów", "Wilanów", "Ursynów"],
  },
  {
    slug: "wroclaw",
    districts: [
      "Fabryczna",
      "Stare Miasto",
      "Krzyki",
      "Śródmieście",
      "Psie Pole",
    ],
  },
  {
    slug: "poznan",
    districts: ["dodaj dzielnice"],
  },
];

export const STEPS_APARTMENTS: string[] = [
  "Wybierz miasto",
  "Wprowadź szczegóły",
  "Wyszukaj",
];
